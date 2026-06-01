import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import jwt, { type JwtPayload } from 'jsonwebtoken';

// URL du backend de test exécuté dans Docker.
// Les tests utilisent l'API HTTP réelle afin de vérifier
// l'intégration complète entre Express, Prisma et PostgreSQL.
const API_URL = 'http://localhost:3002';

describe('[POST] /api/auth/login', () => {
  it('should login admin with valid credentials', async () => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@greenroots.fr',
        password: 'password123',
      }),
    });

    const body = await response.json();

    // Vérifie que l'authentification est acceptée.
    assert.equal(response.status, 200);

    // Vérifie qu'un token JWT est retourné.
    assert.ok(body.token);

    // Vérifie le contenu du JWT.
    const payload = jwt.decode(body.token) as JwtPayload;

    assert.equal(payload.userId, 1);
    assert.equal(payload.role, 'admin');
  });

  it('should login seeded user with valid credentials', async () => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'thomas.martin@email.fr',
        password: 'password123',
      }),
    });

    const body = await response.json();

    // Vérifie qu'un utilisateur seedé peut se connecter.
    assert.equal(response.status, 200);
    assert.equal(body.user.email, 'thomas.martin@email.fr');
    assert.equal(body.user.role, 'user');
    assert.ok(body.token);
  });

  it('should return 401 with wrong password', async () => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@greenroots.fr',
        password: 'wrongpassword',
      }),
    });

    const body = await response.json();

    // Vérifie le refus d'un mot de passe incorrect.
    assert.equal(response.status, 401);
    assert.equal(body.error.code, 'UNAUTHORIZED');
  });

  it('should return 401 with unknown email', async () => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'unknown@email.fr',
        password: 'password123',
      }),
    });

    const body = await response.json();

    // Vérifie le refus d'un utilisateur inexistant.
    assert.equal(response.status, 401);
    assert.equal(body.error.code, 'UNAUTHORIZED');
  });
});

describe('[GET] /api/auth/me', () => {
  it('should return current user when token is valid', async () => {
    // Authentification préalable afin de récupérer un JWT valide.
    const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@greenroots.fr',
        password: 'password123',
      }),
    });

    const loginBody = await loginResponse.json();

    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${loginBody.token}`,
      },
    });

    const body = await response.json();

    // Vérifie que le middleware JWT autorise l'accès.
    assert.equal(response.status, 200);

    // Vérifie les informations injectées dans req.user.
    assert.equal(body.user.userId, 1);
    assert.equal(body.user.role, 'admin');
  });

  it('should return 401 when authorization header is missing', async () => {
    const response = await fetch(`${API_URL}/api/auth/me`);

    const body = await response.json();

    // Vérifie le refus d'accès sans token.
    assert.equal(response.status, 401);
    assert.equal(body.error.code, 'UNAUTHORIZED');
  });

  it('should return 401 when token is invalid', async () => {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: 'Bearer invalid-token',
      },
    });

    const body = await response.json();

    // Vérifie le refus d'un JWT invalide.
    assert.equal(response.status, 401);
    assert.equal(body.error.code, 'UNAUTHORIZED');
  });
});

describe('[POST] /api/auth/register', () => {
  it('should create a new particulier account', async () => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'NodeTest',
        email: `test-${Date.now()}@email.fr`,
        password: 'Password123!',
        address: '1 rue du Test',
        postalCode: '01000',
        city: 'Bourg-en-Bresse',
        type: 'particulier',
      }),
    });

    const body = await response.json();

    // Vérifie la création d'un compte particulier.
    assert.equal(response.status, 201);
    assert.equal(body.message, 'Account created successfully');
    assert.equal(body.user.type, 'particulier');
  });

  it('should return 409 when email already exists', async () => {
    // Génère un email unique afin d'éviter toute dépendance
    // aux données du seed ou aux précédents tests.
    const email = `duplicate-${Date.now()}@email.fr`;

    // Création initiale du compte.
    // Cette requête doit réussir afin que l'email existe en base.
    await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Duplicate',
        lastName: 'User',
        email,
        password: 'Password123!',
        address: '1 rue du Test',
        postalCode: '01000',
        city: 'Bourg-en-Bresse',
        type: 'particulier',
      }),
    });

    // Tentative de création d'un second compte
    // avec le même email.
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Duplicate',
        lastName: 'User',
        email,
        password: 'Password123!',
        address: '1 rue du Test',
        postalCode: '01000',
        city: 'Bourg-en-Bresse',
        type: 'particulier',
      }),
    });

    const body = await response.json();

    // Vérifie que l'API refuse la création
    // et retourne le code HTTP attendu.
    assert.equal(response.status, 409);

    // Vérifie que le code d'erreur métier est correct.
    assert.equal(body.error.code, 'CONFLICT');
  });

  it('should return 400 when entreprise has no siret', async () => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Entreprise',
        lastName: 'Test',
        email: `entreprise-${Date.now()}@email.fr`,
        password: 'Password123!',
        address: '1 rue du Test',
        postalCode: '01000',
        city: 'Bourg-en-Bresse',
        type: 'entreprise',
      }),
    });

    const body = await response.json();

    // Vérifie la validation métier du SIRET.
    assert.equal(response.status, 400);
    assert.equal(body.error.code, 'VALIDATION_ERROR');
  });
});
