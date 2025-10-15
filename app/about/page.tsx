import Grid from "@/components/ui/grid/index";
import Aboutimg from "@/public/image/About.webp";
import Image from "next/image";

export default function AboutPage() {
  return (
    <Grid className="pt-[80px] desktop:pt-[96px] pr-5 pl-5 pb-6">
      <div className="col-span-6">
        <Image src={Aboutimg} alt="About section image" />
      </div>
      <div className="flex flex-col col-span-6 font-junicode text-[16px]/[130%] gap-3 pt-6 pb-10">
        <h1 className="text-[20px] font-bagossTrial ">À propos</h1>
        <p>
          Né en Normandie en 1996, Jonathan Bertin vit et travaille à Paris
          depuis 2023. Photographe de la couleur, maîtrisant aussi bien le
          numérique que l’argentique, il se qualifie volontiers d’artiste “de
          l’ultra-banal”.Adolescent, il arpente sa région natale, explorant les
          paysages et leurs lumières, s’initiant à la pratique photographique.
        </p>
        <p>
           Jeune adulte, il poursuit des études en image. Confronté à l’appel de
          l’ailleurs et à une quête de sens, il initie un long processus
          introspectif nourri par de nécessaires voyages aux quatre coins du
          monde. Durant deux ans, Jonathan exerce son regard et développe sa
          fascination pour “l’instant”. De retour en Normandie, sa vision est
          irrémédiablement transformée par ses périples. Le quotidien, qu’il
          avait fui quelques années plus tôt, lui apparaît sous un jour nouveau
          et devient son terrain de jeu favori.
        </p>
        <p>
          En 2022, Jonathan concrétise cette phase de recherche et présente son
          projet New-York – Quête lors d’une première exposition à la Galerie
          MR80, en off de Paris Photo. Il y illustre son attrait pour
          l’observation et la retranscription d’interactions fugaces, parfois
          poétiques ou burlesques, entre l’humain et l’espace.
        </p>
        <p>
          En 2023 et 2024, sur une commande initiale de la Région Normandie, il
          reprend l’exploration du territoire de ses origines, s’approprie
          pleinement le sujet et réalise Impressionism. Volontairement
          immersive, cette œuvre mêle les sens à la recherche de l’essence d’un
          quotidien normand à travers une série de 54 images, une édition à
          l’approche sensorielle, la création d’un parfum associé, la
          composition d’une bande originale onirique et la réalisation d’un
          documentaire vidéo.
        </p>
        <p>
          Sa démarche, inspirée du mouvement impressionniste, aborde la
          photographie par le prisme du mouvement et de la couleur. Elle propose
          une succession de moments poétiques et suspendus, dont la temporalité
          trouble évoque autant le XIXe siècle de Monet que la douceur d’un
          instant tout juste vécu.La série sera présentée lors d’une exposition
          à l’Abbatiale de Saint-Ouen en juin 2024, dans le cadre du festival
          Normandie Impressionniste, à la Homecoming Gallery à Amsterdam en
          novembre 2024, puis au Ground Seesaw East, à Séoul, en mai 2025.
        </p>
        <p>
          En 2024, il présente Résonance à la Fisheye Galerie (Paris), une
          sélection de prises de vue réalisées lors de ses voyages, où la
          couleur, par touches, devient le lien ténu entre l’individu et son
          environnement.La médiation artistique, synthèse de toutes ses
          expériences, est indissociable de son activité, tant autour de ses
          travaux personnels que de ceux d’artistes émergents, et de la pratique
          de la photographie en général.
        </p>
        <p>
          Photographe de la couleur, il sacralise “l’ultra-banal” et tente le
          pari de saisir et partager au plus grand nombre ces sensations et
          atmosphères personnelles à la portée universelle, éphémères et vouées
          à l’oubli.
        </p>
      </div>
      <div className="flex flex-col col-span-6 gap-6">
        <div className="text-[16px]">
          <h1 className="font-bagossTrial pb-3">Publications</h1>
          <p className="font-junicode">
            Numero, Libération, The Good Life, GQ, Fisheye, Polka, L&#39;Obs,
            Opera de Paris, Konbini, Melty
          </p>
        </div>
        <div>
          <h1 className="font-bagossTrial pb-3">Collaborations</h1>
          <p>
            Burberry, Mont Blanc, Issey Miyake, Airbnb, Adobe, Fujifilm,
            Samsung, Nissan, Lexus, Google, Nikon, Région Normandie, Polaroïd
          </p>
        </div>
        <div>
          <h1 className="font-bagossTrial pb-3">Contact</h1>
          <p>
            Jonathan Bertin
            <br />
            Photographe & Directeur Artistique
            <br />
            <a href="mailto:contact@jonathanbertin.com?">
              contact@jonathanbertin.com
            </a>
          </p>
        </div>
        <div>
          <p>
            Droits d&#39;auteur © 2025{" "}
            <a href="https://jonathanbertin.com/">
              ERRANCE STUDIO - Jonathan Bertin
            </a>
          </p>
        </div>
      </div>
    </Grid>
  );
}
