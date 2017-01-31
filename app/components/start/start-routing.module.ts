import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { HomeComponent }    from './start.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'start', component: HomeComponent }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
