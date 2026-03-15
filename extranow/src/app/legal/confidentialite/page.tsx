export const metadata = {
    title: "Politique de Confidentialité - ExtraNow",
    description: "Comment ExtraNow protège et gère vos données personnelles.",
};

export default function ConfidentialitePage() {
    return (
        <div className="prose prose-slate max-w-none prose-headings:font-outfit prose-headings:font-black">
            <h1 className="text-4xl md:text-5xl text-slate-900 mb-8">Politique de Confidentialité</h1>
            <p className="text-slate-500 font-medium mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">1. Données Collectées</h2>
                <p>Nous collectons les informations que vous nous fournissez lors de la création de votre compte (nom, adresse email, téléphone, expériences professionnelles, SIRET pour les entreprises).</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">2. Utilisation des Données</h2>
                <p>Vos données sont utilisées exclusivement pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Créer et gérer votre compte.</li>
                    <li>Vous mettre en relation avec d'autres utilisateurs de la plateforme.</li>
                    <li>Traiter vos paiements ou reversements via Stripe.</li>
                    <li>Vous envoyer des notifications (emails) essentielles au service.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">3. Sécurité et Hébergement</h2>
                <p>Conformément au RGPD, nous mettons en place des mesures techniques pour protéger vos données contre les accès non autorisés. Vos données sont hébergées sur des serveurs en Europe.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">4. Vos Droits</h2>
                <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, et de portabilité de vos données. Pour exercer ce droit, veuillez nous contacter à privacy@extranow.fr.</p>
            </section>
        </div>
    );
}
