import browser from "webextension-polyfill";

export async function runFunction<F extends (...args: any) => any>(
  f: F,
  args: Parameters<F>
) {
  const t = await browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then((tabs) => tabs[0]);

  if (!t.id) throw new Error("No tab selected");

  const result = await browser.scripting.executeScript({
    target: { tabId: t.id },
    func: f,
    args,
  });

  return result;
}

export function $$tabAction<F extends (...args: any) => any>(f: F) {
  return async (...args: Parameters<F>) => {
    const result = await runFunction(f, args);
    return result[0].result as ReturnType<F>;
  };
}
