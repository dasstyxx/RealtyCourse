namespace RealtyCourse.Business.Models
{
    public class Apartment : BaseModel
    {
        public int HouseId { get; set; }
        public int? Floor { get; set; }
        public double? Price { get; set; }
        public int? RoomAmount { get; set; }
        public double? LivingSquare { get; set; }
        public string ImageName { get; set; }
    }
}
