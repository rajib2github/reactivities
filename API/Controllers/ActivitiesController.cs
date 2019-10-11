using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    
    public class ActivitiesController : BaseController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List() {

            return await Mediator.Send(new List.Query());

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id){
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command cmd){
            return await Mediator.Send(cmd);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Create(Guid id,Edit.Command cmd){
            cmd.Id = id;
            return await Mediator.Send(cmd);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id){
           
            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}