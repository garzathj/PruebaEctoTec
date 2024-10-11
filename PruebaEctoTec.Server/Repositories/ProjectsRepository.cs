using PruebaEctoTec.Server.EF;

namespace PruebaEctoTec.Server.Repositories
{
    public class ProjectsRepository : IProjectsRepository
    {
        private DbContext _context;

        public ProjectsRepository(DbContext context) {
            this._context = context;
        }

        public IEnumerable<Project> GetProjects()
        {
            var projects = _context.Projects.ToList();
            return projects;
        }

        public Project CreateProject(Project project)
        {
            try
            {
                _context.Projects.Add(project);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return project;
        }

        public Project UpdateProject(Project project)
        {
            try
            {
                var projectToUpdate = _context.Projects.Where(x => x.Id == project.Id).FirstOrDefault();
                if (projectToUpdate != null)
                {
                    projectToUpdate.Name = project.Name;
                    _context.Projects.Update(projectToUpdate);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return project;
        }

        public void DeleteProject(int id)
        {
            try
            {
                var projectToDelete = _context.Projects.Where(x => x.Id == id).FirstOrDefault();
                if (projectToDelete != null)
                {
                    _context.Projects.Remove(projectToDelete);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
