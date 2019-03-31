import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from "../../../models/page";
import {PageService} from "../../../services/page.service";
import {ActivatedRoute} from "@angular/router";
import {deserialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit {
  private alias: string;
  page: Page;
  constructor(private pageService: PageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.alias = params.get('alias');
      this.pageService.getPage(this.alias).subscribe(
        (res) => {
          this.page = deserialize<Page>(Page, res);
        });
    });
  }

}
