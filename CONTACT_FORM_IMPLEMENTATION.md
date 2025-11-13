# Recommandations pour rendre le formulaire de contact fonctionnel

## Options recommandées

### Option 1: Service tiers (Recommandé pour ce projet)

#### **Formspree** (Gratuit jusqu'à 50 soumissions/mois)
Le plus simple à intégrer pour un site statique Astro.

**Avantages:**
- Aucun backend requis
- Configuration en quelques minutes
- Gratuit pour usage personnel
- Protection anti-spam intégrée

**Implémentation:**

1. Créer un compte sur [Formspree](https://formspree.io/)
2. Obtenir votre endpoint unique (ex: `https://formspree.io/f/YOUR_FORM_ID`)
3. Modifier le formulaire dans `src/components/Contact.astro`:

```astro
<form id="contact-form" class="space-y-6" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="hidden" name="_subject" value="Nouveau message depuis le portfolio" />
    <input type="text" name="_gotcha" style="display:none" /> <!-- Anti-spam -->
    
    <div>
        <label for="name" class="block text-sm font-medium text-dark-200 mb-2">
            Nom complet
        </label>
        <input
            type="text"
            id="name"
            name="name"
            required
            class="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-dark-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
            placeholder="John Doe"
        />
    </div>
    
    <!-- Garder les autres champs identiques -->
    
    <button type="submit" class="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold">
        Envoyer
    </button>
</form>
```

#### **EmailJS** (Gratuit jusqu'à 200 emails/mois)
Alternative avec plus de contrôle côté client.

**Avantages:**
- Envoi direct depuis le navigateur
- Templates d'email personnalisables
- Bonne documentation

**Implémentation:**

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurer un service email (Gmail, Outlook, etc.)
3. Créer un template d'email
4. Installer la bibliothèque:
```bash
npm install @emailjs/browser
```

5. Modifier `src/components/Contact.astro`:

```astro
---
// En haut du fichier
---

<form id="contact-form" class="space-y-6">
    <!-- Garder le HTML actuel -->
</form>

<script>
    import emailjs from '@emailjs/browser';
    
    // Initialiser EmailJS avec votre clé publique
    emailjs.init("YOUR_PUBLIC_KEY");
    
    const form = document.getElementById("contact-form") as HTMLFormElement;
    const messageDiv = document.getElementById("form-message");
    
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        try {
            await emailjs.sendForm(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                form
            );
            
            if (messageDiv) {
                messageDiv.className = "mt-4 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400";
                messageDiv.textContent = "✓ Message envoyé ! Je vous répondrai dans les plus brefs délais.";
                messageDiv.classList.remove("hidden");
            }
            
            form.reset();
            
            setTimeout(() => {
                messageDiv?.classList.add("hidden");
            }, 5000);
        } catch (error) {
            if (messageDiv) {
                messageDiv.className = "mt-4 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400";
                messageDiv.textContent = "✗ Une erreur s'est produite. Veuillez réessayer.";
                messageDiv.classList.remove("hidden");
            }
        }
    });
</script>
```

### Option 2: API Backend personnalisée

Si vous voulez plus de contrôle ou avez besoin de fonctionnalités avancées.

#### **Astro API Routes**
Créer une route API Astro pour gérer l'envoi d'emails.

**Avantages:**
- Contrôle total
- Peut être hébergé avec Astro (nécessite mode SSR)
- Pas de dépendance à un service tiers

**Inconvénients:**
- Nécessite un hébergement compatible SSR (pas de sites statiques)
- Plus de configuration

**Implémentation:**

1. Modifier `astro.config.mjs` pour activer SSR:
```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'hybrid', // Permet d'avoir des pages statiques ET des routes API
  adapter: node({
    mode: 'standalone'
  })
});
```

2. Installer nodemailer:
```bash
npm install nodemailer
```

3. Créer `src/pages/api/contact.ts`:
```typescript
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;
    
    // Configurer le transporteur email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou autre service
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS
      }
    });
    
    // Envoyer l'email
    await transporter.sendMail({
      from: import.meta.env.EMAIL_USER,
      to: 'tabarbaptiste@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>Nouveau message de ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'envoi' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
```

4. Créer `.env`:
```
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-application
```

5. Modifier le script dans `Contact.astro`:
```javascript
form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Afficher le message de succès
        } else {
            // Afficher le message d'erreur
        }
    } catch (error) {
        // Gérer l'erreur
    }
});
```

### Option 3: Netlify Forms (Si hébergé sur Netlify)

**Avantages:**
- Intégration native avec Netlify
- Très simple à configurer
- Gratuit jusqu'à 100 soumissions/mois

**Implémentation:**

Ajouter simplement `data-netlify="true"` au formulaire:

```html
<form id="contact-form" class="space-y-6" name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact" />
    <!-- Reste du formulaire -->
</form>
```

## Recommandation finale

Pour votre portfolio actuel (site statique Astro):

**Utilisez Formspree** - C'est la solution la plus rapide et la plus fiable sans nécessiter de changements d'infrastructure. Il suffit de:

1. Créer un compte Formspree (gratuit)
2. Obtenir l'endpoint
3. Remplacer l'action du formulaire
4. Tester !

Si vous prévoyez d'ajouter plus de fonctionnalités backend à l'avenir, considérez **EmailJS** ou **l'API Astro avec mode hybrid**.
