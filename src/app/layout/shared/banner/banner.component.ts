import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BannerService} from "../../../services/banner.service";
import {Banner} from "../../../models/banner";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent implements OnInit {
  @Input()
  area: string;
  banners: Banner[];
  constructor(private bannerService: BannerService) { }

  ngOnInit() {
    if (this.area != null) {
      this.bannerService.getBanners(this.area).subscribe(
        res => {
          this.banners = res;
        }
      );
    }
  }

}
