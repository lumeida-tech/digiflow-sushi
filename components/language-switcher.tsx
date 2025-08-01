"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
// import {useChangeLocale, useCurrentLocale} from "@/locales/client";


type Language = {
    code: string
    name: string
    flag: string
}

const languages: Language[] = [
    {
        code: "en",
        name: "English",
        flag: "🇬🇧"
    },
    {
        code: "fr",
        name: "Français",
        flag: "🇫🇷"
    }
]

export default function LanguageSwitcher() {
    const currentLang = "fr"
    const  changeLang = (lang: 'en' | 'fr') => {
        if (lang === 'fr') {
            document.documentElement.lang = 'fr'
        } else {
            document.documentElement.lang = 'en'
        }
    }

    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === currentLang) || languages[0]
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-[140px] cursor-pointer justify-start gap-2 font-normal"
                >
                    <span className="text-lg leading-none">{getCurrentLanguage().flag}</span>
                    <span>{getCurrentLanguage().name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[140px]">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        className="gap-2"
                        onClick={() => changeLang(language.code as 'en' | 'fr' )}
                    >
                        <span className="text-lg leading-none">{language.flag}</span>
                        <span>{language.name}</span>
                        {currentLang === language.code && (
                            <Check className="h-4 w-4 ml-auto" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

