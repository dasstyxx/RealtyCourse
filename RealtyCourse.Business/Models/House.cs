namespace RealtyCourse.Business.Models
{
    public class House : BaseModel
    {
        public string Address { get; set; }
        public int? MaxFloor { get; set; }
        public int? BuildYear { get; set; }
        public string WallMaterial { get; set; }
        public string ImageName { get; set; }
    }
}
