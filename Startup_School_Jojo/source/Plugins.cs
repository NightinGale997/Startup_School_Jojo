namespace Plugins{
    public class Plugin
    {
        public int Id {get; set;}
        public string Name {get;set;} = "";
        public List<int> Sample_id {get;set;} = new List<int>{};
        public string Settings {get;set;} = "";

        public Plugin(int id, string name = "Undefined"){
            Id = id;
            Name = name;
        }
    }
}