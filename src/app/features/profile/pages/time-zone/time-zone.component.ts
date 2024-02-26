import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "../../../../core/services/user/user.service";
import { MessageService } from "../../../../shared/services/message.service";
import { LogService } from "../../../../core/services/log/log.service";
import { ConfigService } from "../../../../shared/services/config.service";
import { Message } from "src/app/shared/interfaces/api-message";
import { catchError, switchMap } from "rxjs/operators";
import { OnenetUser } from "src/app/core/models/onenetUser";

@Component({
  selector: "app-time-zone",
  templateUrl: "./time-zone.component.html",
  styleUrls: ["./time-zone.component.scss"],
})
export class TimeZoneComponent implements OnInit {
  public profileForm: FormGroup;
  public user: OnenetUser;
  public timezones: any[];
  public dateFormat: any[];

  public message =
    "Time-zone & Region information of user." +
    " You can change them however you wish, but there is not backend functionality yet and" +
    " after logout all changes will be lost";
  userTimezone = "";

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private configService: ConfigService,
    private logger: LogService
  ) {
    this.userService
      .getUser()
      .pipe(
        switchMap((user) => {
          this.userTimezone = user.timezone;
          return this.configService.getTimezones();
        })
      )
      .subscribe((timezones) => {
        this.timezones = [];
        for (const timezone of timezones) {
          if (timezone === this.userTimezone || timezone === "UTC")
            this.timezones.push({
              id: timezone,
              description: timezone,
            });
        }
      });

    this.dateFormat = [
      { id: "YYYY-MM-DD", description: "2021-01-31" },
      { id: "DD/MM/YYYY", description: "31/01/2021" },
      { id: "MM/DD/YYYY", description: "01/31/2021" },
    ];
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.profileForm = this.fb.group({
          timezone: [
            localStorage.getItem("timezone")
              ? localStorage.getItem("timezone")
              : user.timezone,
          ],
          dateFormat: [
            localStorage.getItem("dateFormat")
              ? localStorage.getItem("dateFormat")
              : user.dateFormat,
          ],
        });
      },
      (error) => {
        this.logger.error(error);
        this.messageService.showMsg([
          new Message("Something went wrong on get user"),
        ]);
      }
    );
  }

  ngOnInit(): void {}

  update(): void {
    // update timezone
    this.userService.updateTimezone(this.profileForm.get("timezone").value);
    this.userService.updateDateFormat(this.profileForm.get("dateFormat").value);

    this.userService
      .getTimezone()
      .pipe(
        catchError((error) => {
          this.messageService.showMsg([
            new Message("Something went wrong on updating Timezone"),
          ]);
          return error;
        })
      )
      .subscribe(() =>
        this.messageService.showMsg([
          new Message("Timezone changed successfully", "success"),
        ])
      );
  }
}
