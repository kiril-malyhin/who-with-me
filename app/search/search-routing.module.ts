import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { SearchComponent }    from './search.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'home', component: SearchComponent }
    ])],
    exports: [RouterModule]
})
export class SearchRoutingModule {}
