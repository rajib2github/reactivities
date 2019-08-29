using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Data
{
    public class Seed
    {
        public static void SeedData(DataContext context){

            if(!context.Activities.Any()){

                var activities = new List<Activity>{

                    new Activity {
                        Title ="Past Activity 1",
                        Descrition="Activity 2 months ago",
                        Date = DateTime.Now.AddMonths(-2),
                        Category="drink",
                        City="London",
                        Venue="Pub"
                    },
                    new Activity {
                        Title ="Past Activity 2",
                        Descrition="Activity 1 month ago",
                        Date = DateTime.Now.AddMonths(-1),
                        Category="culture",
                        City="Paris",
                        Venue="Louvre"
                    },
                    new Activity {
                        Title ="Future Activity 1",
                        Descrition="Activity 1 month in future",
                        Date = DateTime.Now.AddMonths(1),
                        Category="culture",
                        City="London",
                        Venue="Museum"
                    },
                    new Activity {
                        Title ="Future Activity 2",
                        Descrition="Activity 2 months in future",
                        Date = DateTime.Now.AddMonths(2),
                        Category="culture",
                        City="New York",
                        Venue="Cinema"
                    }
                    
                };
                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}