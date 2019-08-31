using System;
using System.Threading;
using System.Threading.Tasks;
using Data;
using Domain;
using MediatR;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public DateTime Date { get; set; }
            public string Descrition { get; set; }
            public string Category { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

         public class Handler : IRequestHandler<Command>
         {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity{

                    Id = request.Id,
                    Title = request.Title,
                    Descrition = request.Descrition,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue

                };

                _context.Activities.Add(activity);
                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
    }
    }

   
}