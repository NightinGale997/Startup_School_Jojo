namespace Samples{
    public class Sample
    {
        public int Id {get; set;}
        public string Name {get;set;} = "";
        public int Plugin_id {get;set;}
        public string Settings {get;set;} = "";

        public Sample(int id, string name = "Defolt", string settings = "Defolt"){
            Id = id;
            Name = name;
            Settings = settings;
        }
    }
}