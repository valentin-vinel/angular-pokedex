# Angular Pokedex

Installation d'Angular sur la machine:
`npm install -g @angular/cli`

Génération d'un projet Angular:
`ng new ng-pokemon-app --minimal --style=css`

## Configuration

`app.module.ts` > module principal: **racine**
    -> **déclarations**: ensemble des composants
    -> **imports**: ensemble des modules nécessaires à l'application
    -> **providers**: injection de dépendances
    -> **bootstrap**: unique au composant **racine** qui répond à ***Quel est le 1er composant à afficher lors du démarrage de l'app?***

`ng serve` permet de démarrer l'application sur localhost:4200

## Composant

Un composant web = une classe + une vue

Il fonctionne en associant la logique d'une classe TypeScript avec un template HTML.

La classe comporte l'annotation **@component** pour indiquer à Angular
que cette classe est un composant. La classe manipule l'ensemble des
données. On parle de *state*.

Un composant à un cycle de vie qui est géré directement par Angular.

Angular nous permet d'agir sur les moments clés au moment où ils se produisent grâce à différentes interfaces.
Ces interfaces sont natives à Angular et nous y avons accès.

- **ngOnChanges**: C'est la méthode appelée en premier lors de la création d'un composant, avant même **ngOnInit**, et à chaque fois que Angular détecte que les valeurs d'une propriété du composant sont modifiées.
- **ngOnInit**: Méthode appelée juste après le premier appel à **ngOnChanges**, elle initialise le composant après que Angular ait initialisé les propriétés du composant.
- **ngDoCheck**: On peut implémenter cette interface pour étendre le comportement par défaut de la méthode **ngOnChanges**, afin de pouvoir détecter et agir sur des changement que Angular ne peut pas détecter lui même.
- **ngAfterViewInit**: Méthode appelée juste après la mise en place de la vue d'un composant (et des vues de ses composants fils s'il en a)
- **ngOnDestroy**: Appelée en dernier, cette méthode est appelée avant qu'Angular ne détruise et ne retire du DOM le composant. Cela peut se produire quand un utilisateur navigue d'un composant à un autre par exemple. Afin d'éviter les fuites de mémoire, c'est dans cette méthode que nous effectuerons un certain nombre d'opérations afin de laisser l'app "propre" (nous détacheorns les gestionnaires d'évènements par exemple).

Exemple de déclaration d'une méthode:
```ts
@Component({
  selector: 'app-root',
  template: `<h1>Welcome to {{ pokemonList[0] }}!</h1>`,
}) 
export class AppComponent implements OnInit {
  pokemonList = ['Bulbizarre', 'Salamèche', 'Carapuce'];

  ngOnInit() {
    console.table(this.pokemonList)
  }
}
```

## Templates

Le template s'occupe d'afficher les données intégrées dans du HTML et d'écouter les événements souhaités.

`templateUrl` permet de passer l'URL vers le fichier de notre template.

1. Pour initialiser et manipuler les données du composant, ça se passe dans la classe TypeScript.
2. Pour afficher les données, on utilise l'interpolation avec les `{{ nomVariable }}` dans le template.
3. Pour écouter les événements, on utilise les `(nomEvent)=nomMethode()` dans le template.
4. Pour intéragir avec l'événement, on doit créer la méthode dans la classe TypeScript.

## Directives

Une directive est une classe Angular qui ressemble beaucoup à un composant, sauf qu'elle n'a pas de template.

On utilise l'annotation *@Directive* pour déclarer une directive dans notre application.

3 types de directives:
- Les composants
- Les directives d'attributs
- Les directives structurelles

Créer un composant directive via le terminal: `ng generate directive <nom-du-composant>`

Il s'ajoute automatiquement dans **app.component.ts**

Une directive utilise un sélecteur CSS pour cibler les éléments HTML sur lesquels elle s’applique.

Il est recommandé de préfixer le nom de ses directives pour éviter les problèmes de collisions.

Angular crée une nouvelle instance de notre directive à chaque fois qu'il détecte un élément HTML avec l'attribut correspondant. Il injecte alors dans le constructeur de la directive l'élément du DOM ElementRef.

Il faut déclarer notre directive au niveau du système de modules d'Angular pour pouvoir l’utiliser.

On utilise l'annotation *@HostListener* pour gérer les interactions de l'utilisateur au sein d'une directive.

## Pipes

Les pipes permettent de formater les données affichées dans nos templates.

L'opérateur des pipes est "|"

Angular fournit des pipes prêts à l'emploi qui sont disponibles dans tous les templates de notre application : DatePipe, UpperCasePipe, LowerCasePipe, etc.

```html
<p><small>{{ pokemon.created | date:"dd/MM/YYYY" }}</small></p>
```

Pour générer un fichier @Pipe:
`ng generate pipe <pokemon-type-color>`

On peut créer des pipes personnalisés pour les besoins de notre application avec l'annotation @Pipe.

Les pipes personnalisés doivent être déclarés au niveau d'un module Angular avant de pouvoir être utilisés dans les templates de composants. 

## Les routes

Dans le fichier `app-routing.modules.ts`, nous indiquons dans le tableau *routes*, les chemins (URL) des routes que nous souhaitons afficher, en les liants au composant correspondant:

```ts
const routes: Routes = [
  { path: 'pokemons', component: ListPokemonComponent},
  { path: 'pokemon/:id', component: DetailPokemonComponent},
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' }
];
```

La balise <router-outlet> permet de définir où le template des composants fils sera injecté. Cette balise est disponible dans tous les templates des composants du module racine.

Pour récupérer `/:id` dans mon component `detail-pokemon.component.ts`, je dois placer dans mon constructeur *ActivatedRoute*:

```ts
export class DetailPokemonComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    const pokemonId: string | null = this.router.snapshot.paramMap.get('id');
  }

}
```

Pour naviguer via les liens cliquables sur les templates, il faut définir une fonction de navigation dans le component via *Router*

```ts
@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent {

  pokemonList: Pokemon[] = POKEMONS;

  constructor(private router: Router) { }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id])
  }

}
```

```ts
<div (click)="goToPokemon(pokemon)" class="card horizontal" pkmnBorderCard>
```

**Page 404: not found**

Pour gérer la page 404 de notre app, nous créons un nouveau composant via CLI:

`ng generate component page-not-found`

Nous l'appelons donc dans le *app-routing.module.ts* à la fin de notre tableau routes avec le chemin '**'. Celui-ci intercepte toutes les routes.

Le système de routes d'Angular interprète les routes qui sont déclarées du haut vers le bas. Il est donc impératif de placer la route 404 à la fin de notre tableau.

```ts
const routes: Routes = [
  { path: 'pokemons', component: ListPokemonComponent},
  { path: 'pokemon/:id', component: DetailPokemonComponent},
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
```

Les routes doivent être regroupées par fonctionnalité au sein de modules.

## Modules

Les modules sont nécessaire pour l'organisation et la structure de notre architecture.

Il existe deux types de modules : le **module racine** et les **modules de fonctionnalité**.

On déclare un module avec l'annotation @NgModule, quel que soit le type de ce module.

Chaque module regroupe tous les composants, directives, pipes et services qui sont liés au développement d'une fonctionnalité donnée, dans un dossier à part.

Chaque module peut disposer de ses propres routes également.
On définit les routes de nos sous-modules avec forChild et forRoot pour les routes du module racine.

**Module racine**:
```ts
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    PokemonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**"Sous"-module Pokemon**:
```ts
@NgModule({
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pokemonRoutes)
  ]
})
export class PokemonModule { }
```

## Services

L'annotation d'un service est **@Injectable**.

Un service permet de factoriser et de centraliser du code qui peut être utile ailleurs dans l'application.

On utilise l'injection de dépendances pour rendre un service disponible dans toute l'application, dans un module ou au niveau d'un composant.

On ne gère jamais nous-mêmes les dépendances d'un composant ou d'un service, car on doit toujours passer le système d'injection de dépendances fournit par Angular.

L'injecteur racine 'root' permet de garantir que l'instance de notre service est unique à travers **toute l'application.**
```ts
@Injectable({
  providedIn: 'root'
})
```

Pour qu'un service soit disponible seulement dans un module, on l'ajoute au module comme ceci via *providers*:
```ts
@NgModule({
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers: [PokemonService]
})
```

L'annotation **@Injectable** est déjà présente de manière invisible dans les annotations *@Component*, *@Pipe* et *@Directive*.

## Forms

Le module **FormsModule** est utile pour développer des formulaires avec Angular. Il met à notre disposition les directives *NgForm* et *NgModel*.

La directive *NgModel* ajoute et retire certaines classes au champ sur lequel elle s'applique. Ces classes peuvent être utilisées pour afficher des messages d'erreurs ou de succès et des indicateurs visuels à l'utilisateur.

La syntaxe à retenir pour utiliser NgModel est "crochets-parenthèses" comme ceci [(ngModel)].
```ts
<!-- Pokemon name -->
  <div class="form-group">
    <label for="name">Nom</label>
    <input type="text" class="form-control"  id="name"
      required
      pattern="^[a-zA-Z0-9àéèç]{1,25}$"
      [(ngModel)]="pokemon.name" name="name"
      #name="ngModel">
  <div [hidden]="name.valid || name.pristine"
    class="card-panel red accent-1">
    Le nom du pokémon est requis (1-25).
  </div>
</div>
```

On peut utiliser les attributs HMTL5 pour gérer la validation côté client comme *required* ou *pattern*.
On peut aussi utiliser des validateurs personnalisés en développant nos propres méthodes de validation dans la classe du composant.

Bien sûr, il faut toujours effectuer une validation côté serveur en complément de la validation côté client, si vous avez prévu de stocker des données depuis votre application.

## Programmation réactive

Les promesses sont natives en JavaScript depuis l'arrivée de la norme ES6.

La programmation réactive implique de gérer des flux de données asynchrones.
> *Programmation réactive = Programmation avec des flux de données asynchrones*

Un **flux** est une séquence d'événements ordonnés dans le temps.
On peut appliquer différentes opérations sur les flux : regroupements, filtrages, troncatures, etc.

Un flux peut émettre trois types de réponses : la valeur associée à un événement, une erreur ou une notification de complétion pour mettre fin au flux.

La librairie **RxJS** est la librairie la plus populaire pour implémenter la programmation réactive en JavaScript.
Dans RxJS les flux d'événements sont représentés par un objet appelé Observable. 

## Requêtes HTTP

Il est possible de simuler facilement une API Rest au sein d'une application Angular grâce à la librairie InMemotyData. Cela permet d'interagir avec un jeu de données configuré à l'avance.

Angular inclut son propre client HTTP pour effectuer des requêtes réseaux.

Les types de requêtes les plus courantes sont GET, POST, PUT et DELETE.
Le client HTTP d'Angular permet de typer les valeurs reçues à travers le réseau.

Les **Observables** permettent de faciliter la gestion des événements asynchrones. Ils sont adaptés pour gérer des séquences d'évènements.

## RxJS

Les opérateurs RxJS doivent être importés depuis la librairie RxJS car ils ne font pas partis du framework Angular directement, ils permettent de traiter des flux.

Un **Observable** est un producteur de données uniquement.

Un **Subject** est un Observable également mais il est possible de lui permettre de nouvelles données dynamiquement.

Le traitement des flux de RxJS permet de transformer un flux de chaîne de caractères en un flux d’objets métiers. Dans notre cas, on a pu transformer les termes de recherches de l’utilisateur en une liste de Pokémons correspond aux critères de la recherche. Plutôt puissant !