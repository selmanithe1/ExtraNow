export const metadata = {
    title: "Conditions Générales d'Utilisation - ExtraNow",
    description: "Conditions Générales d'Utilisation de la plateforme ExtraNow.",
};

export default function CGUPage() {
    return (
        <div className="prose prose-slate max-w-none prose-headings:font-outfit prose-headings:font-black">
            <h1 className="text-4xl md:text-5xl text-slate-900 mb-8">Conditions Générales d'Utilisation (CGU)</h1>
            <p className="text-slate-500 font-medium mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">1. Objet</h2>
                <p>Les présentes Conditions Générales d'Utilisation ont pour objet d'encadrer l'accès et l'utilisation de la plateforme ExtraNow. Toute inscription ou utilisation du site implique l'acceptation sans réserve des présentes CGU.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">2. Description des Services</h2>
                <p>ExtraNow fournit une plateforme de mise en relation entre des établissements du secteur de l'hôtellerie-restauration (ci-après les "Clients") et des professionnels indépendants ou salariés (ci-après les "Extras").</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">3. Accès au service</h2>
                <p>L'accès à la plateforme est réservé aux personnes physiques majeures et aux personnes morales dûment enregistrées. L'utilisateur s'engage à fournir des informations exactes lors de son inscription.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">4. Engagements des Utilisateurs</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Les Extras</strong> s'engagent à posséder les compétences déclarées et à honorer les missions acceptées.</li>
                    <li><strong>Les Clients</strong> s'engagent à décrire précisément les missions et à traiter avec respect les Extras.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl text-slate-800 mb-4">5. Responsabilité</h2>
                <p>ExtraNow intervient uniquement comme intermédiaire technique de mise en relation. La responsabilité de l'exécution de la prestation incombe exclusivement aux Parties (Client et Extra).</p>
            </section>
        </div>
    );
}
