using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.IO;
using Employees.Models;
using Microsoft.AspNetCore.Hosting;

namespace Employees.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }


        [HttpGet]
        public JsonResult Get()
        {
            const string query = @"
                         select Id, EmployeeName, HomeAddress, Mail, 
                         convert(varchar(10),DateOfBirth,120) as DateOfBirth,
                         convert(varchar(10),DateOfEmployment,120) as DateOfEmployment,
                         Workplace, Superior, PhotoFileName
                         from dbo.Employee";
            ;
            var table = QueryTable(query);

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Employee employee)
        {
            var query = @"
                         insert into dbo.Employee
                         (EmployeeName, HomeAddress, Mail, DateOfBirth, DateOfEmployment,
                          Workplace, Superior, PhotoFileName)
                         values 
                         (
                         '" + employee.EmployeeName + @"',
                         '" + employee.HomeAddress + @"',
                         '" + employee.Mail + @"',
                         '" + employee.DateOfBirth + @"',
                         '" + employee.DateOfEmployment + @"',
                         '" + employee.Workplace + @"',
                         '" + employee.Superior + @"',
                         '" + employee.PhotoFileName + @"'
                         )
                         ";
            ;

            QueryTable(query);

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Employee employee)
        {
            var query = @"
                        update dbo.Employee set
                        EmployeeName = '" + employee.EmployeeName + @"',
                        HomeAddress = '" + employee.HomeAddress + @"',
                        Mail = '" + employee.Mail + @"',
                        DateOfBirth = '" + employee.DateOfBirth + @"',
                        DateOfEmployment = '" + employee.DateOfEmployment + @"',
                        Workplace = '" + employee.Workplace + @"',
                        Superior = '" + employee.Superior + @"',
                        PhotoFileName = '" + employee.PhotoFileName + @"'
                        where Id = " + employee.Id+@"
                        "
            ;

            QueryTable(query);

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var query = @"
                        delete from dbo.Employee
                        where Id = " + id + @"
                        "
                ;

            QueryTable(query);

            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                var fileName = postedFile.FileName;
                var physicalPath = _environment.ContentRootPath + "/Photos/" + fileName;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                } 

                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        private DataTable QueryTable(string query)
        {
            var table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using var myCon = new SqlConnection(sqlDataSource);
            myCon.Open();

            using var myCommand = new SqlCommand(query, myCon);
            var myReader = myCommand.ExecuteReader();
            table.Load(myReader);

            myReader.Close();
            myCon.Close();

            return table;
        }
    }
}
