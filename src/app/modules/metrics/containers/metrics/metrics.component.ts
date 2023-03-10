import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatDialogState,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DatasetsService } from '@src/app/services/datasets.service';
import { NotificationService } from '@src/app/services/notification.service';
import { ConfirmDialogService } from '@src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { LoadingComponent } from '@src/app/shared/components/loading/containers/loading/loading.component';
import { IFile } from '@src/app/shared/interfaces/dataset.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit, AfterViewInit {
  private loadingDialog?: MatDialogRef<LoadingComponent>;
  dataSource?: MatTableDataSource<IFile>;
  columns = ['fileName', 'actions'];

  constructor(
    private matDialog: MatDialog,
    private datasetsService: DatasetsService,
    private notificationService: NotificationService,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadDatasets();
  }

  async loadDatasets() {
    this.showLoading();

    try {
      const datasets = await lastValueFrom(
        this.datasetsService.getDatasets('metrics'),
      );
      this.dataSource = new MatTableDataSource(datasets);
    } catch (err) {
      this.notificationService.error(
        'No se pudieron cargar los datasets, intente más tarde.',
      );
    }

    this.hideLoading();
  }

  showLoading() {
    if (this.loadingDialog?.getState() !== MatDialogState.OPEN) {
      this.loadingDialog = this.matDialog.open(LoadingComponent, {
        disableClose: true,
      });
    }
  }

  hideLoading() {
    this.loadingDialog?.close();
  }
}
