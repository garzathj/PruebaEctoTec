using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PruebaEctoTec.Server.EF;
using PruebaEctoTec.Server.Repositories;

namespace PruebaEctoTec.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("projects")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsRepository _repository;

        public ProjectsController(IProjectsRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet, Route("GetAllProjects")]
        public IEnumerable<Project> GetAllProjects()
        {
            var projects = this._repository.GetProjects();
            return projects;
        }

        [HttpPost, Route("CreateProject")]
        public Project CreateProject([FromBody]Project project)
        {
            var result = this._repository.CreateProject(project);
            return result;
        }

        [HttpPut, Route("UpdateProject")]
        public Project UpdateProject([FromBody]Project project)
        {
            var result = this._repository.UpdateProject(project);
            return result;
        }

        [HttpDelete, Route("DeleteProject")]
        public bool DeleteProject(int id)
        {
            this._repository.DeleteProject(id);
            return true;
        }
    }
}
