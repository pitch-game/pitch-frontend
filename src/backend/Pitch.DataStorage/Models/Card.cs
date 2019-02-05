using System;

namespace Pitch.DataStorage.Models
{
    /// <summary>
    /// Generated from a pack and many-to-many with Player
    /// </summary>
    public class Card
    {
        //TODO Link property
        public Guid PlayerId { get; set; }

        public int Fitness { get; set; }
        public long Xp { get; set; }

        public Statistics Statistics { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public class Statistics
    {
        public int Played { get; set; }
        public DateTime LastPlayed { get; set; }
    }
}
