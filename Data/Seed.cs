using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManger)
        {
            if(!userManger.Users.Any()){
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName="Rajib H",
                        UserName="rajib",
                        Email = "rajib2u@gmail.com"

                    },
                    new AppUser
                    {
                        DisplayName="Kasturi H",
                        UserName="kasturi",
                        Email = "kash.rajib@gmail.com"

                    },
                    new AppUser
                    {
                        DisplayName="Raktim H",
                        UserName="guppa",
                        Email = "guppa@gmail.com"

                    }
                };

                foreach (var user in users)
                {
                    await userManger.CreateAsync(user, "Pa$$w0rd");
                }
                
            }

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