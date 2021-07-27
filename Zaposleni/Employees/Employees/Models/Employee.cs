using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employees.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string HomeAddress { get; set; }
        public string Mail { get; set; }
        public string DateOfBirth { get; set; }
        public string DateOfEmployment { get; set; }
        public string Workplace { get; set; }
        public string Superior { get; set; }
        public string PhotoFileName { get; set; }


    }
}
