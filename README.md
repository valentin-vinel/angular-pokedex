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

