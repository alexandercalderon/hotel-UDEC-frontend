import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { CheckOut } from "src/app/ocupacion-checks/interfaces/check-out";
import { CheckOutService } from "src/app/ocupacion-checks/services/check-out.service";
@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    checks: CheckOut[] = [];

    constructor(
        private service: CheckOutService,
        private confirm: ConfirmationService,
        private message: MessageService
    ) {}

    ngOnInit(): void {
        this.list();
    }
    eliminar(id: number): void {
      console.log(id)
        this.confirm.confirm({
            message: "¿estas segur@ de eliminar este check out?",
            header: "eliminar el check out " + id,
            icon: "pi pi-times-circle",
            accept: () => {
                this.service.delete(id).subscribe(() => {
                    this.list();
                });
                this.message.add({
                    severity: "success",
                    summary: " check out eliminado :D",
                    detail: "el check out ha sido eliminado ",
                });
              }
        });
    }
    list(): void {
        this.service.list().subscribe((checkOuts) => {
            this.checks = checkOuts;
        });
    }
    
}
