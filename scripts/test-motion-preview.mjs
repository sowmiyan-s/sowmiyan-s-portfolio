import { chromium } from 'playwright';

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await chromium.launch({
    executablePath: edgePath,
    headless: true,
  });

  const baseArtifactDir = 'C:\\Users\\Asus\\.gemini\\antigravity-ide\\brain\\58d2ee15-90a2-42cf-ad4f-fc3fbf24a1fc';

  // 1. Desktop 1440x900
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log('Navigating desktop...');
  await desktopPage.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
  await desktopPage.waitForTimeout(2000);

  // Desktop Hero Viewport
  await desktopPage.screenshot({
    path: `${baseArtifactDir}\\wix_studio_hero_view.png`,
    fullPage: false,
  });

  // Scroll down to Projects
  await desktopPage.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({
    path: `${baseArtifactDir}\\wix_studio_projects_view.png`,
    fullPage: false,
  });

  // Desktop Full Page
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: `${baseArtifactDir}\\wix_studio_desktop_full.png`,
    fullPage: true,
  });

  // 2. Mobile 390x844
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  console.log('Navigating mobile...');
  await mobilePage.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(2000);

  await mobilePage.screenshot({
    path: `${baseArtifactDir}\\wix_studio_mobile_full.png`,
    fullPage: true,
  });

  await browser.close();
  console.log('Captured all screenshots successfully!');
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
