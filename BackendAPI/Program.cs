var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Formula 1 API", Version = "v1" });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ============================
// In-Memory F1 Data Store
// ============================

var teams = new List<Team>
{
    new(1, "Red Bull Racing", "Austria", "Christian Horner", "Honda RBPT", "Milton Keynes, UK", 6, "#3671C6"),
    new(2, "Mercedes-AMG Petronas", "Germany", "Toto Wolff", "Mercedes", "Brackley, UK", 8, "#27F4D2"),
    new(3, "Scuderia Ferrari", "Italy", "Frédéric Vasseur", "Ferrari", "Maranello, Italy", 16, "#E80020"),
    new(4, "McLaren F1 Team", "United Kingdom", "Andrea Stella", "Mercedes", "Woking, UK", 8, "#FF8000"),
    new(5, "Aston Martin", "United Kingdom", "Mike Krack", "Mercedes", "Silverstone, UK", 0, "#229971"),
    new(6, "Alpine F1 Team", "France", "Oliver Oakes", "Renault", "Enstone, UK", 2, "#FF87BC"),
    new(7, "Williams Racing", "United Kingdom", "James Vowles", "Mercedes", "Grove, UK", 9, "#64C4FF"),
    new(8, "Visa Cash App RB", "Italy", "Laurent Mekies", "Honda RBPT", "Faenza, Italy", 0, "#6692FF"),
    new(9, "Kick Sauber", "Switzerland", "Mattia Binotto", "Ferrari", "Hinwil, Switzerland", 0, "#52E252"),
    new(10, "Haas F1 Team", "United States", "Ayao Komatsu", "Ferrari", "Kannapolis, USA", 0, "#B6BABD")
};

var drivers = new List<Driver>
{
    new(1, "Max", "Verstappen", "VER", 1, "Dutch", 1, "Red Bull Racing", 26, 62, 108, 40),
    new(2, "Sergio", "Perez", "PER", 11, "Mexican", 1, "Red Bull Racing", 34, 5, 39, 6),
    new(3, "Lewis", "Hamilton", "HAM", 44, "British", 3, "Scuderia Ferrari", 39, 103, 202, 104),
    new(4, "Charles", "Leclerc", "LEC", 16, "Monégasque", 3, "Scuderia Ferrari", 27, 8, 40, 26),
    new(5, "Lando", "Norris", "NOR", 4, "British", 4, "McLaren F1 Team", 25, 3, 22, 14),
    new(6, "Oscar", "Piastri", "PIA", 81, "Australian", 4, "McLaren F1 Team", 23, 2, 10, 4),
    new(7, "Carlos", "Sainz", "SAI", 55, "Spanish", 7, "Williams Racing", 30, 4, 25, 6),
    new(8, "Alexander", "Albon", "ALB", 23, "Thai", 7, "Williams Racing", 28, 0, 2, 0),
    new(9, "George", "Russell", "RUS", 63, "British", 2, "Mercedes-AMG Petronas", 26, 3, 15, 7),
    new(10, "Andrea Kimi", "Antonelli", "ANT", 12, "Italian", 2, "Mercedes-AMG Petronas", 19, 0, 0, 0),
    new(11, "Fernando", "Alonso", "ALO", 14, "Spanish", 5, "Aston Martin", 43, 32, 106, 22),
    new(12, "Lance", "Stroll", "STR", 18, "Canadian", 5, "Aston Martin", 26, 0, 3, 1),
    new(13, "Pierre", "Gasly", "GAS", 10, "French", 6, "Alpine F1 Team", 28, 1, 4, 0),
    new(14, "Jack", "Doohan", "DOO", 7, "Australian", 6, "Alpine F1 Team", 22, 0, 0, 0),
    new(15, "Yuki", "Tsunoda", "TSU", 22, "Japanese", 8, "Visa Cash App RB", 24, 0, 1, 0),
    new(16, "Isack", "Hadjar", "HAD", 6, "French", 8, "Visa Cash App RB", 20, 0, 0, 0),
    new(17, "Nico", "Hulkenberg", "HUL", 27, "German", 9, "Kick Sauber", 37, 0, 0, 0),
    new(18, "Gabriel", "Bortoleto", "BOR", 5, "Brazilian", 9, "Kick Sauber", 20, 0, 0, 0),
    new(19, "Oliver", "Bearman", "BEA", 87, "British", 10, "Haas F1 Team", 20, 0, 1, 0),
    new(20, "Esteban", "Ocon", "OCO", 31, "French", 10, "Haas F1 Team", 28, 1, 4, 0)
};

var races = new List<Race>
{
    new(1, "Australian Grand Prix", "Albert Park", "Melbourne, Australia", "2025-03-16", 58, "5.278 km"),
    new(2, "Chinese Grand Prix", "Shanghai International", "Shanghai, China", "2025-03-23", 56, "5.451 km"),
    new(3, "Japanese Grand Prix", "Suzuka", "Suzuka, Japan", "2025-04-06", 53, "5.807 km"),
    new(4, "Bahrain Grand Prix", "Bahrain International", "Sakhir, Bahrain", "2025-04-13", 57, "5.412 km"),
    new(5, "Saudi Arabian Grand Prix", "Jeddah Corniche", "Jeddah, Saudi Arabia", "2025-04-20", 50, "6.174 km"),
    new(6, "Miami Grand Prix", "Miami International", "Miami, USA", "2025-05-04", 57, "5.412 km"),
    new(7, "Emilia Romagna Grand Prix", "Imola", "Imola, Italy", "2025-05-18", 63, "4.909 km"),
    new(8, "Monaco Grand Prix", "Circuit de Monaco", "Monte Carlo, Monaco", "2025-05-25", 78, "3.337 km"),
    new(9, "Spanish Grand Prix", "Barcelona-Catalunya", "Barcelona, Spain", "2025-06-01", 66, "4.657 km"),
    new(10, "Canadian Grand Prix", "Circuit Gilles Villeneuve", "Montreal, Canada", "2025-06-15", 70, "4.361 km"),
    new(11, "Austrian Grand Prix", "Red Bull Ring", "Spielberg, Austria", "2025-06-29", 71, "4.318 km"),
    new(12, "British Grand Prix", "Silverstone", "Silverstone, UK", "2025-07-06", 52, "5.891 km"),
    new(13, "Belgian Grand Prix", "Spa-Francorchamps", "Stavelot, Belgium", "2025-07-27", 44, "7.004 km"),
    new(14, "Hungarian Grand Prix", "Hungaroring", "Budapest, Hungary", "2025-08-03", 70, "4.381 km"),
    new(15, "Dutch Grand Prix", "Zandvoort", "Zandvoort, Netherlands", "2025-08-31", 72, "4.259 km"),
    new(16, "Italian Grand Prix", "Monza", "Monza, Italy", "2025-09-07", 53, "5.793 km"),
    new(17, "Azerbaijan Grand Prix", "Baku City", "Baku, Azerbaijan", "2025-09-21", 51, "6.003 km"),
    new(18, "Singapore Grand Prix", "Marina Bay", "Singapore", "2025-10-05", 62, "4.940 km"),
    new(19, "United States Grand Prix", "COTA", "Austin, USA", "2025-10-19", 56, "5.513 km"),
    new(20, "Mexico City Grand Prix", "Hermanos Rodriguez", "Mexico City, Mexico", "2025-10-26", 71, "4.304 km"),
    new(21, "São Paulo Grand Prix", "Interlagos", "São Paulo, Brazil", "2025-11-09", 71, "4.309 km"),
    new(22, "Las Vegas Grand Prix", "Las Vegas Strip", "Las Vegas, USA", "2025-11-22", 50, "6.201 km"),
    new(23, "Qatar Grand Prix", "Lusail", "Lusail, Qatar", "2025-11-30", 57, "5.419 km"),
    new(24, "Abu Dhabi Grand Prix", "Yas Marina", "Abu Dhabi, UAE", "2025-12-07", 58, "5.281 km")
};

var driverStandings = new List<DriverStanding>
{
    new(1, "Max Verstappen", "Red Bull Racing", 437),
    new(2, "Lando Norris", "McLaren F1 Team", 374),
    new(3, "Charles Leclerc", "Scuderia Ferrari", 356),
    new(4, "Oscar Piastri", "McLaren F1 Team", 292),
    new(5, "Carlos Sainz", "Williams Racing", 290),
    new(6, "George Russell", "Mercedes-AMG Petronas", 245),
    new(7, "Lewis Hamilton", "Scuderia Ferrari", 223),
    new(8, "Sergio Perez", "Red Bull Racing", 152),
    new(9, "Fernando Alonso", "Aston Martin", 70),
    new(10, "Pierre Gasly", "Alpine F1 Team", 42)
};

var constructorStandings = new List<ConstructorStanding>
{
    new(1, "McLaren F1 Team", 666, "#FF8000"),
    new(2, "Scuderia Ferrari", 652, "#E80020"),
    new(3, "Red Bull Racing", 589, "#3671C6"),
    new(4, "Mercedes-AMG Petronas", 468, "#27F4D2"),
    new(5, "Aston Martin", 94, "#229971"),
    new(6, "Alpine F1 Team", 65, "#FF87BC"),
    new(7, "Haas F1 Team", 58, "#B6BABD"),
    new(8, "Visa Cash App RB", 46, "#6692FF"),
    new(9, "Williams Racing", 17, "#64C4FF"),
    new(10, "Kick Sauber", 4, "#52E252")
};

// ============================
// API Endpoints
// ============================

// Drivers
app.MapGet("/api/drivers", () => drivers)
    .WithName("GetAllDrivers").WithTags("Drivers").WithOpenApi();

app.MapGet("/api/drivers/{id}", (int id) =>
{
    var driver = drivers.FirstOrDefault(d => d.Id == id);
    return driver is not null ? Results.Ok(driver) : Results.NotFound(new { message = "Driver not found" });
}).WithName("GetDriverById").WithTags("Drivers").WithOpenApi();

// Teams
app.MapGet("/api/teams", () => teams)
    .WithName("GetAllTeams").WithTags("Teams").WithOpenApi();

app.MapGet("/api/teams/{id}", (int id) =>
{
    var team = teams.FirstOrDefault(t => t.Id == id);
    return team is not null ? Results.Ok(team) : Results.NotFound(new { message = "Team not found" });
}).WithName("GetTeamById").WithTags("Teams").WithOpenApi();

// Races
app.MapGet("/api/races", () => races)
    .WithName("GetAllRaces").WithTags("Races").WithOpenApi();

// Standings
app.MapGet("/api/standings/drivers", () => driverStandings)
    .WithName("GetDriverStandings").WithTags("Standings").WithOpenApi();

app.MapGet("/api/standings/constructors", () => constructorStandings)
    .WithName("GetConstructorStandings").WithTags("Standings").WithOpenApi();

app.Run();

// ============================
// Record Definitions
// ============================

record Driver(int Id, string FirstName, string LastName, string Code, int Number, string Nationality, int TeamId, string Team, int Age, int Wins, int Podiums, int Poles);
record Team(int Id, string Name, string Country, string TeamPrincipal, string PowerUnit, string Base, int Championships, string Color);
record Race(int Id, string Name, string Circuit, string Location, string Date, int Laps, string CircuitLength);
record DriverStanding(int Position, string Driver, string Team, int Points);
record ConstructorStanding(int Position, string Team, int Points, string Color);
