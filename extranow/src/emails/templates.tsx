import { Html, Body, Container, Section, Text, Heading, Link, Button, Tailwind } from '@react-email/components';

const main = {
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '40px 20px',
    borderRadius: '16px',
    marginTop: '40px',
    marginBottom: '40px',
    border: '1px solid #f1f5f9',
};

const button = {
    backgroundColor: '#f97316',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    padding: '16px',
    marginTop: '32px',
};

export function ApplicationAcceptedEmail({ 
    extraName, 
    companyName, 
    missionType, 
    missionDate 
}: { 
    extraName: string; 
    companyName: string; 
    missionType: string; 
    missionDate: string; 
}) {
    return (
        <Html>
            <Tailwind>
                <Body style={main}>
                    <Container style={container}>
                        <Section>
                            <Text style={{ color: '#f97316', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Bonne nouvelle ! 🎉
                            </Text>
                            <Heading style={{ color: '#0f172a', fontSize: '24px', fontWeight: 'bold', margin: '16px 0' }}>
                                Votre candidature a été acceptée par {companyName}
                            </Heading>
                            <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '24px' }}>
                                Bonjour {extraName},
                            </Text>
                            <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '24px' }}>
                                Félicitations ! L'établissement <strong>{companyName}</strong> a validé votre profil pour la mission suivante :
                            </Text>
                            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', margin: '24px 0' }}>
                                <Text style={{ color: '#0f172a', fontWeight: 'bold', margin: '0 0 8px 0' }}>{missionType}</Text>
                                <Text style={{ color: '#64748b', margin: '0' }}>Le {missionDate}</Text>
                            </div>
                            <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '24px' }}>
                                Connectez-vous à votre espace ExtraNow pour discuter avec l'établissement et obtenir plus de détails sur la prestation.
                            </Text>
                            
                            <Button href={`${process.env.NEXT_PUBLIC_APP_URL}/extras/messages`} style={button}>
                                Envoyer un message à l'établissement
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export function NewApplicationEmail({ 
    companyName, 
    extraName, 
    missionType 
}: { 
    companyName: string; 
    extraName: string; 
    missionType: string; 
}) {
    return (
        <Html>
            <Tailwind>
                <Body style={main}>
                    <Container style={container}>
                        <Section>
                            <Heading style={{ color: '#0f172a', fontSize: '24px', fontWeight: 'bold', margin: '16px 0' }}>
                                Nouvelle candidature pour {missionType}
                            </Heading>
                            <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '24px' }}>
                                Bonjour {companyName},
                            </Text>
                            <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '24px' }}>
                                L'extra <strong>{extraName}</strong> vient de postuler à votre annonce pour le poste de {missionType}.
                            </Text>
                            
                            <Button href={`${process.env.NEXT_PUBLIC_APP_URL}/entreprises/dashboard/applications`} style={button}>
                                Voir la candidature
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export function NewMessageEmail({ 
    recipientName, 
    senderName 
}: { 
    recipientName: string; 
    senderName: string; 
}) {
    return (
        <Html>
            <Tailwind>
                <Body style={main}>
                    <Container style={container}>
                        <Section>
                            <Heading style={{ color: '#0f172a', fontSize: '24px', fontWeight: 'bold', margin: '16px 0' }}>
                                Vous avez reçu un nouveau message
                            </Heading>
                            <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '24px' }}>
                                Bonjour {recipientName},
                            </Text>
                            <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '24px' }}>
                                <strong>{senderName}</strong> vous a envoyé un message sur ExtraNow.
                            </Text>
                            
                            <Button href={`${process.env.NEXT_PUBLIC_APP_URL}/login`} style={button}>
                                Lire le message
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
