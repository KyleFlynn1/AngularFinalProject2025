import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StocklistComponent } from './components/stocklist/stocklist.component';
import { SearchComponent } from './components/search/search.component';
import { StockcalculatorComponent } from './components/stockcalculator/stockcalculator.component';

export const routes: Routes = [
    {path: '', component: SearchComponent},
    {path: 'history', component: StocklistComponent},
    {path: 'calculator', component: StockcalculatorComponent}

];
