import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuOptionEnum } from '../models/menu-option.enum';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  menuOptions = MenuOptionEnum;
  menuValue: string = this.menuOptions.projectsList;
  projects: Project[] = [];
  projectNameToUpdate: string = '';
  createProjectForm: FormGroup;

  constructor(private projectsService: ProjectsService, private router: Router,
              private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.getAllProjects();

    this.createProjectForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  menuChange(value: string) {
    this.menuValue = value;

    if (value === this.menuOptions.projectsList) {
      this.getAllProjects();
    }

    if (value === this.menuOptions.newProject) {
      this.createProjectForm.reset();
    }
  }

  getAllProjects() {
    this.projectsService.getAllProjects().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProject(project: Project) {
    this.createProjectForm.controls['id'].setValue(project.id);
    this.createProjectForm.controls['name'].setValue(project.name);
    this.projectNameToUpdate = project.name;
    this.menuChange(this.menuOptions.updateProject);
  }

  submit() {
    if (this.createProjectForm.valid) {
      var project: Project = this.createProjectForm.value;
      project.id = 0;
      this.projectsService.createProject(project).subscribe(
        (response) => {
          alert('Projecto ' + response.name + ' creado.');
          this.createProjectForm.reset();
          this.getAllProjects();
          this.menuChange(this.menuOptions.projectsList);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  update() {
    if (this.createProjectForm.valid) {
      var project: Project = this.createProjectForm.value;
      this.projectsService.updateProject(project).subscribe(() => {
        alert('Projecto actualizado');
        this.createProjectForm.reset();
        this.projectNameToUpdate = '';
        this.getAllProjects();
        this.menuChange(this.menuOptions.projectsList);
      },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteProject(project: Project) {
    if (confirm("Confirmas la eliminación del projecto " + project.name)) {
      this.projectsService.deleteProject(project.id).subscribe(() => {
        this.getAllProjects();
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
