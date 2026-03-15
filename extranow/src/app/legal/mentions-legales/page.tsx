export const metadata = {
    title: "Mentions Légales - ExtraNow",
    description: "Mentions légales de la plateforme de mise en relation ExtraNow.",
};

export default function MentionsLegalesPage() {
    return (
        <div className="prose prose-slate max-w-none prose-headings:font-outfit prose-headings:font-black">
            <h1 className="text-4xl md:text-5xl text-slate-900 mb-8">Mentions Légales</h1>
            <p className="text-slate-500 font-medium mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">1. Éditeur du Site</h2>
                <p>Le site Internet ExtraNow est édité par :</p>
                <ul className="list-none pl-0 space-y-1">
                    <li><strong>ExtraNow SAS</strong></li>
                    <li>Société par Actions Simplifiée au capital de 10 000 €</li>
                    <li>RCS Paris B 123 456 789</li>
                    <li>Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France</li>
                    <li>Contact : contact@extranow.fr</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">2. Directeur de la publication</h2>
                <p>M. Jean Dupont, en qualité de Président.</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl text-slate-800 mb-4">3. Hébergement</h2>
                <p>Le site ExtraNow est hébergé par :</p>
                <ul className="list-none pl-0 space-y-1">
                    <li><strong>Vercel Inc.</strong></li>
                    <li>340 S Lemon Ave #4133 Walnut, CA 91789, USA</li>
                    <li>Site Web: https://vercel.com</li>
                </ul>
            </section>
        </div>
    );
}
