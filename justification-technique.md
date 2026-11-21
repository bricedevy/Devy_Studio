# Justification technique – Devy Studio

**1. Choix de breakpoint.** La grille des services utilise `col-12 col-md-6 col-lg-4`. À 768 px, trois cartes par rangée seraient trop étroites (environ 220 px) et leur texte se répartirait sur beaucoup de lignes : deux colonnes restent lisibles. Comme il y a six cartes, chaque disposition (1, 2 ou 3 colonnes) donne des rangées complètes, sans carte orpheline. La navbar se replie sous 992 px (`navbar-expand-lg`), le même seuil où le héros passe sur deux colonnes, ce qui donne une seule frontière entre « tablette » et « ordinateur ».

**2. Bootstrap et simplification du CSS.** `.ratio .ratio-16x9` conserve le format de la vidéo locale et de l'iframe YouTube sans aucune règle personnalisée, et `.table-responsive` fait défiler le tableau dans son conteneur sans faire déborder la page. Ma feuille `style.css` se limite ainsi à l'identité visuelle : couleurs, polices et détails.

**3. Optimisation multimédia.** J'ai choisi le format WebP pour les images : l'illustration de l'accueil pèse 15 Ko, contre 35 Ko en JPEG et 222 Ko en PNG. Chaque image existe en 600 et en 1 200 px (`srcset`), pour qu'un téléphone ne télécharge pas la grande version. La vidéo est en MP4 H.264 720p (324 Ko pour 12 s) et le jingle en MP3 à 96 kb/s (226 Ko). Le site complet pèse environ 1 Mo.

**4. Principal problème responsive.** À 375 px, le tableau à cinq colonnes ne tient pas dans l'écran. Je l'ai placé dans un conteneur `.table-responsive`, mais sa légende, aussi large que le tableau, était coupée. Je l'ai raccourcie et j'ai ajouté une consigne de défilement. J'ai aussi corrigé des images de cartes étirées par l'attribut `height` du HTML, grâce à la classe `h-auto`.
