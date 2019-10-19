import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { LayoutService } from './services/layout.service';
import { faUsers, faFutbol, faTicketAlt, faShoppingBasket, faMoneyBill, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserHttpService } from './services/http/user.http-service';
import { MatchService } from './services/match.service';
import { MatchmakingService } from './services/matchmaking.service';
import { UserProfile } from './models/user/profile';
import { MatchHttpService } from './services/http/match.http-service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { Card } from './models/card/card';
import { StoreHttpService } from './services/http/store.http-service';
import { OpenPackPopupComponent } from './components/open-pack-popup/open-pack-popup.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  title = 'Pitch';

  seasonsIcon = faFutbol;
  squadIcon = faUsers;
  challengesIcon = faTicketAlt;
  storeIcon = faShoppingBasket;
  marketplaceIcon = faMoneyBill;
  loadingIcon = faSpinner;

  inProgress: any;

  isLoggedIn: boolean;
  version: string;

  profile: UserProfile;
  username: string;

  cards: { [id: string]: Card } = {};
  packs: any[];
  cmpRef: any;

  @ViewChild('drawer', null) drawer: any;

  links = [
    { name: 'Quick Match', icon: 'sports_soccer' }
  ];

  teamLinks = [
    { name: 'Squad', icon: 'group', route: '/squad/active' },
    { name: 'Club', icon: 'work', route: '/squad/club' },
    { name: 'History', icon: 'show_chart', route: '/seasons/history' }
  ]

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  constructor(public authService: AuthService,
    public layoutService: LayoutService,
    private router: Router,
    private userService: UserHttpService,
    public matchService: MatchService,
    private matchHttpService: MatchHttpService,
    public matchmakingService: MatchmakingService,
    private breakpointObserver: BreakpointObserver,
    private store: StoreHttpService, 
    private componentFactoryResolver: ComponentFactoryResolver, 
    private viewContainerRef: ViewContainerRef) {

    this.authService.isLoggedIn().subscribe(async (isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) return;
      this.profile = await this.userService.get();
      await this.matchService.init();
      await this.matchmakingService.init();
    });

    this.authService.getUserData().subscribe((user) => {
      if (!user) return;
      this.username = user.name;
    });

    this.version = environment.version;
    
    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close())

    this.router.events.subscribe((event) => {
      //if(typeof(event) == NavigationEnd) { TODO
      this.layoutService.showNav = false;
      //}
    });

    this.store.getPacks().subscribe((packs) => {
      this.packs = packs;
    });
  }

  click() {
    if(!this.packs || this.packs.length == 0) return;
    let id = this.packs.pop().id;
    if (this.cards[id] && this.cards[id].opened) return;
    this.open(id);
  }

  open(id: string) {
    let factory = this.componentFactoryResolver.resolveComponentFactory(OpenPackPopupComponent);
    this.cmpRef = this.viewContainerRef.createComponent(factory);

    this.cmpRef.instance.packId = id;
    this.cmpRef.instance.packsLeft = this.packs.length;

    this.cmpRef.instance.openNext = () => {
      this.cmpRef.destroy();
      this.click();
    };

    this.cmpRef.instance.destroy = () => {
      this.cmpRef.destroy();
    };
  }  

  async claim() {
    await this.matchHttpService.claim();
    await this.matchService.init();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  toggleMenu() {
    this.layoutService.toggleNav();
  }

  login() {
    this.authService.startAuthentication();
  }

  signOut() {
    this.authService.signOut();
  }
}
