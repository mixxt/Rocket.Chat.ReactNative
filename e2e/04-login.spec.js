const {
	device, expect, element, by, waitFor
} = require('detox');
const { takeScreenshot } = require('./helpers/screenshot');
const { addServer, navigateToLogin } = require('./helpers/app');
const data = require('./data');

describe('Login screen', () => {
	before(async() => {
		await device.launchApp({ delete: true, permissions: { notifications: 'YES' } });
		await addServer();
		await navigateToLogin();
	});

	describe('Render', () => {
		it('should have login screen', async() => {
			await expect(element(by.id('login-view'))).toBeVisible();
		});

		it('should have email input', async() => {
			await expect(element(by.id('login-view-email'))).toBeVisible();
		});

		it('should have password input', async() => {
			await expect(element(by.id('login-view-password'))).toBeVisible();
		});

		it('should have show password icon', async() => {
			await expect(element(by.id('login-view-password-icon-right'))).toBeVisible();
		});

		it('should have submit button', async() => {
			await expect(element(by.id('login-view-submit'))).toBeVisible();
		});

		it('should have register button', async() => {
			await expect(element(by.id('login-view-register'))).toBeVisible();
		});

		it('should have forgot password button', async() => {
			await expect(element(by.id('login-view-forgot-password'))).toBeVisible();
		});

		it('should have close modal button', async() => {
			await expect(element(by.id('close-modal-button'))).toBeVisible();
		});

		after(async() => {
			takeScreenshot();
		});
	});

	describe('Usage', () => {
		beforeEach(async() => {
			await device.reloadReactNative();
			await navigateToLogin();
		});

		it('should navigate to register', async() => {
			await element(by.id('login-view-register')).tap();
			await waitFor(element(by.id('register-view'))).toBeVisible().withTimeout(2000);
			await expect(element(by.id('register-view'))).toBeVisible();
		});
	
		it('should navigate to forgot password', async() => {
			await element(by.id('login-view-forgot-password')).tap();
			await waitFor(element(by.id('forgot-password-view'))).toBeVisible().withTimeout(2000);
			await expect(element(by.id('forgot-password-view'))).toBeVisible();
		});

		it('should navigate to welcome', async() => {
			await element(by.id('close-modal-button')).tap();
			await waitFor(element(by.id('welcome-view'))).toBeVisible().withTimeout(2000);
			await expect(element(by.id('welcome-view'))).toBeVisible();
		});
	
		it('should insert wrong password and get error', async() => {
			await element(by.id('login-view-email')).tap();
			await element(by.id('login-view-email')).replaceText(data.user);
			await element(by.id('login-view-password')).tap();
			await element(by.id('login-view-password')).typeText('error');
			await element(by.id('login-view-submit')).tap();
			await waitFor(element(by.text('User or Password incorrect'))).toBeVisible().withTimeout(10000);
			await expect(element(by.text('User or Password incorrect'))).toBeVisible();
		});
	
		it('should login with success', async() => {
			await element(by.id('login-view-email')).tap();
			await element(by.id('login-view-email')).replaceText(data.user);
			await element(by.id('login-view-password')).tap();
			await element(by.id('login-view-password')).replaceText(data.password);
			await element(by.id('login-view-submit')).tap();
			await waitFor(element(by.id('rooms-list-view'))).toBeVisible().withTimeout(10000);
			await expect(element(by.id('rooms-list-view'))).toBeVisible();
		});

		afterEach(async() => {
			takeScreenshot();
		});
	});
});