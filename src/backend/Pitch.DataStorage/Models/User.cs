using Pitch.Core;
using System;
using System.Collections.Generic;

namespace Pitch.DataStorage.Models
{
    /// <summary>
    /// A human user of the pitch site
    /// </summary>
    public class User : BaseEntity
    {
        public long Xp { get; set; }

        /// <summary>
        /// Move to domain model
        /// </summary>
        public int Level => Convert.ToInt32(Constants.XpToLevelMultiplier * Math.Sqrt(Xp));

        public double Money { get; set; }
        public Squad ActiveSquad { get; set; }
    }

    /// <summary>
    /// Squad
    /// </summary>
    public class Squad
    {
        public IList<Slot> Positions { get; set; }
    }

    /// <summary>
    /// Links a Card to a Position
    /// </summary>
    public class Slot
    {
        public Position Position { get; set; }
        public Card Card { get; set; }
    }

    public enum Position
    {
        GK,
        CB,
        LB,
        RB,
        CM,
        LM,
        RM,
        ST
    }
}
