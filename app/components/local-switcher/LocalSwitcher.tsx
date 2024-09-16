"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <label className="border-2 rounded p-3">
      <p className="sr-only">change language</p>
      <select
        defaultValue={localActive}
        className="bg-transparent w-[90%] md:w-[180px]"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">🇳🇬 Nigeria</option>
        <option value="sw">🇰🇪 Kenya</option>
        <option value="id">🇮🇩 Indonesia</option>
        <option value="hi">🇮🇳 India</option>
        <option value="en">🇺🇸 United State</option>
        <option value="ja">🗾 Japan</option>
        <option value="en">🇬🇧 United Kingdom</option>
        <option value="zh-hans"> China</option>
        <option value="fr">🇫🇷 France</option>
        <option value="ar">🇸🇦 Arabic</option>
        <option value="de">🇩🇪 Germany</option>
        <option value="ko">🇰🇵 Korean</option>
      </select>
    </label>
  );
}
