import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/services/alert/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // topFilterList = [];
  // public projectSchedulerItem: ProjectScheduler = {rooms: []};
  // activeProject: any;
  // roomDashboardFilterList = [];
  // dashboardRoomList = [];
  // filterBySensorType = 'all';
  // private destroy$: Subject<boolean> = new Subject<boolean>();
  // @Output() changeRoomDashboardFilterList = new EventEmitter();
  // selectSensorType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    // this.getDataByActiveProject();
  }

  // getDataByActiveProject() {
  //   this.projectsService.activeProject$.pipe(takeUntil(this.destroy$)).subscribe(res => {
  //     if (res) {
  //       this.activeProject =  res;
  //       this.activeProject.rooms = _.orderBy(this.activeProject.rooms, ['name'],['asc']);
  //       this.getTopFilterSensors();
  //       this.getProjectSensorsAndValues();
  //       this.getActiveProjectDataByInterval();
  //       this.roomDashboardFilterList = this.setSelected(this.activeProject.rooms);
  //       this.roomDashboardFilterList.unshift({name: 'All', roomId: 'all', selected: false});
  //     }
  //   });
  // }

  ngOnDestroy() {
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }
}
