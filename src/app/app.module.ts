import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { AnnouncementDetailsComponent } from './components/announcement-details/announcement-details.component';
import { StudentWallComponent } from './components/student-wall/student-wall.component';
import { StudentWallDetailsComponent } from './components/student-wall-details/student-wall-details.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { SchedulerDetailsComponent } from './components/scheduler-details/scheduler-details.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesDetailsComponent } from './components/notes-details/notes-details.component';
import { SupportComponent } from './components/support/support.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { RateItComponent } from './components/rate-it/rate-it.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PeerMentorshipComponent } from './components/peer-mentorship/peer-mentorship.component';
import { PeerMentorshipRegistarationComponent } from './components/peer-mentorship-registaration/peer-mentorship-registaration.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { GroupFormationComponent } from './components/group-formation/group-formation.component';
import { MentorChatComponent } from './components/mentor-chat/mentor-chat.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    AnnouncementComponent,
    AnnouncementDetailsComponent,
    StudentWallComponent,
    StudentWallDetailsComponent,
    SchedulerComponent,
    SchedulerDetailsComponent,
    NotesComponent,
    NotesDetailsComponent,
    SupportComponent,
    FaqComponent,
    ContactusComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    FeedbackComponent,
    RateItComponent,
    ProfileComponent,
    PeerMentorshipComponent,
    PeerMentorshipRegistarationComponent,
    RequestListComponent,
    RequestDetailsComponent,
    GroupFormationComponent,
    MentorChatComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
