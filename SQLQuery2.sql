create table dbo.Employee(
Id int identity(1,1),
EmployeeName varchar(500),
HomeAddress varchar(500),
Mail varchar(500),
DateOfBirth date,
DateOfEmployment date,
Workplace varchar(500),
Superior varchar(500),
PhotoFileName varchar(500)
)

insert into dbo.Employee values
('Janez Novak', 'Čez cesto 3', 'janeznovak@mail.com', '1988-05-03', '2020-03-02', 'Senior Programmer', 'Alen Milas', '1.png')
