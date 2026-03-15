export const metadata = {
    title: "Conditions Générales de Vente - ExtraNow",
    description: "Conditions Générales de Vente pour les services de recrutement ExtraNow.",
};

export default function CGVPage() {
    return (
        <div className="prose prose-slate max-w-none prose-headings:font-outfit prose-headings:font-black">
            <h1 className="text-4xl md:text-5xl text-slate-900 mb-8">Conditions Générales de Vente (CGV)</h1>
            <p className="text-slate-500 font-medium mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">1. Préambule</h2>
                <p>Les présentes Conditions Générales de Vente s'appliquent à toutes les transactions réalisées sur la plateforme ExtraNow entre la société éditrice et les Clients (établissements).</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">2. Tarification</h2>
                <p>Le modèle économique de la plateforme repose sur une commission prélevée sur le montant de la prestation. Cette commission est clairement indiquée lors de la publication ou de la validation de la mission.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">3. Modalités de Paiement</h2>
                <p>Les paiements sont sécurisés par notre partenaire Stripe. Le montant de la prestation est pré-autorisé ou facturé à la confirmation de la mission selon les conditions choisies par le Client.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">4. Annulation</h2>
                <p>En cas d'annulation par le Client moins de 24h avant le début de la mission, l'intégralité de la prestation reste due à l'Extra. En cas d'annulation par l'Extra, des pénalités sur son compte ExtraNow pourront s'appliquer.</p>
            </section>
        </div>
    );
}
