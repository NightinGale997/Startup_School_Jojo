using Samples;
namespace Workspaces{
    public class Workspace
    {
        public int Id {get; set;}
        public string Name {get;set;}
        public List<int> Sample_id { get; set; } = new List<int>();
        public string Settings {get;set;} = "";
        public Workspace(int id, string name = "Undefined"){
            Id = id;
            Name = name;
        }
    }
}