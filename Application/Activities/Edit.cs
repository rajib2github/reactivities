using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Data;
using FluentValidation;
using MediatR;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public DateTime? Date { get; set; }
            public string Descrition { get; set; }
            public string Category { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Title).NotEmpty();
                RuleFor(x=>x.Descrition).NotEmpty();
                RuleFor(x=>x.Category).NotEmpty();
                RuleFor(x=>x.Date).NotEmpty();
                RuleFor(x=>x.City).NotEmpty();
                RuleFor(x=>x.Venue).NotEmpty();
            }
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
                var activity = await _context.Activities.FindAsync(request.Id);

                 if(activity == null)
                   throw new RestException(HttpStatusCode.NotFound, new { activity="not found"});

                activity.Title = request.Title ?? activity.Title;
                activity.Descrition = request.Descrition ?? activity.Descrition;
                activity.Date = request.Date ?? activity.Date;
                activity.Category = request.Category ?? activity.Category;
                activity.City = request.City ?? activity.City;
                activity.Venue = request.Venue ?? activity.Venue;

                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;
                throw new Exception("Problem editing activity");
            }
        }


    }
}