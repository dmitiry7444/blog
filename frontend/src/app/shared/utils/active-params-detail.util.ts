import {ActiveParamsType} from "../../../types/active-params.type";
import {Params} from "@angular/router";
import {ActiveDetailParamsType} from "../../../types/active-detail-params.type";

export class ActiveParamsDetailUtil {
  static processParams(params: Params): ActiveDetailParamsType {
    const activeParams: ActiveDetailParamsType = {url: ''};

    if (params.hasOwnProperty('url')) {
      activeParams.url = params['url'];
    }

    return activeParams;
  }
  }

