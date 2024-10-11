using PruebaEctoTec.Server.EF;

namespace PruebaEctoTec.Server.Repositories
{
    public interface IProjectsRepository
    {
        IEnumerable<Project> GetProjects();
        Project CreateProject(Project project);
        Project UpdateProject(Project project);
        void DeleteProject(int id);
    }
}
