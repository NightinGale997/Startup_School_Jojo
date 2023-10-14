using System.Collections.Generic;

namespace MyApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public List<int> Channels { get; set; } = new List<int>();
        public List<string> Modules { get; set; } = new List<string>();
        public List<int> Friends { get; set; } = new List<int>();
        public User(string name = "Undefined", string login = "Undefined", string password = "Undefined")
        {
            Name = name;
            Login = login;
            Password = password;
            
        }
    }
}
