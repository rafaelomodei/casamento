import { NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

import { tableRepository } from '@/infra/repositories/firebase/TableServerFirebaseRepositories';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { ListTablesUseCase } from '@/domain/tables/useCases/listTables/ListTablesUseCase';
import { prepareTablesForDisplay } from '@/lib/utlils/tables';
import { buildTablesPdfHtml } from '@/lib/pdf/tables-html';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

async function resolveExecutablePath(): Promise<string> {
  const executablePath = await chromium.executablePath();
  if (executablePath) {
    return executablePath;
  }

  const envExecutable =
    process.env.PUPPETEER_EXECUTABLE_PATH ??
    process.env.CHROME_EXECUTABLE_PATH ??
    process.env.CHROMIUM_EXECUTABLE_PATH;

  if (envExecutable) {
    return envExecutable;
  }

  throw new Error(
    'Não foi possível localizar o executável do Chromium. Defina a variável de ambiente PUPPETEER_EXECUTABLE_PATH com o caminho do Chrome/Chromium local.'
  );
}

export async function GET() {
  let browser: puppeteer.Browser | undefined;

  try {
    const listTables = new ListTablesUseCase(tableRepository, userRepository);
    const tables = await listTables.execute();

    const { tables: preparedTables, overview } =
      prepareTablesForDisplay(tables);
    const html = buildTablesPdfHtml(preparedTables, overview, new Date());

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720 },
      executablePath: await resolveExecutablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '12mm', bottom: '16mm', left: '12mm', right: '12mm' },
    });

    await page.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="organizacao-mesas.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Não foi possível gerar o PDF da organização de mesas.';

    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
