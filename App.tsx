import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AccountCatalogSection } from './src/features/accounting/components/AccountCatalogSection';
import { ACCOUNT_CLASSES } from './src/features/accounting/data/accounts';
import { ImputationQuizScreen } from './src/features/game_engine/components/ImputationQuizScreen';
import { IMPUTATION_QUESTIONS } from './src/features/game_engine/data/imputationQuestions';
import './global.css';
import { useGameStore } from './src/store/useGameStore';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentLevel, hasHydrated, lives, maxLives, restoreLives, streak, xp } =
    useGameStore();
  const levelProgress = xp % 250;

  if (!hasHydrated) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-950">
        <StatusBar style="light" />
        <ActivityIndicator color="#34D399" size="large" />
        <Text className="mt-4 text-sm text-slate-300">Chargement de votre progression…</Text>
      </SafeAreaView>
    );
  }

  if (isPlaying) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950">
        <StatusBar style="light" />
        <ImputationQuizScreen
          onExit={() => setIsPlaying(false)}
          questions={IMPUTATION_QUESTIONS}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <StatusBar style="light" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-bold uppercase tracking-[3px] text-emerald-400">
              SYSCOHADA révisé
            </Text>
            <Text className="mt-1 text-3xl font-extrabold text-white">Compta Quest</Text>
          </View>
          <View className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3">
            <Text className="text-sm font-bold text-red-300">
              Vies {lives}/{maxLives}
            </Text>
          </View>
        </View>

        <View className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <Text className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
            Votre progression
          </Text>
          <View className="mt-5 flex-row items-end justify-between">
            <View>
              <Text className="text-sm text-slate-400">Niveau</Text>
              <Text className="mt-1 text-4xl font-extrabold text-white">{currentLevel}</Text>
            </View>
            <View className="items-end">
              <Text className="text-sm text-slate-400">Expérience totale</Text>
              <Text className="mt-1 text-2xl font-bold text-amber-300">{xp} XP</Text>
            </View>
          </View>
          <View className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
            <View
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${(levelProgress / 250) * 100}%` }}
            />
          </View>
          <Text className="mt-2 text-xs text-slate-400">
            {levelProgress}/250 XP vers le niveau {currentLevel + 1}
          </Text>
        </View>

        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Série de bonnes réponses
            </Text>
            <Text className="mt-2 text-2xl font-bold text-amber-300">{streak}</Text>
          </View>
          <View className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Référentiel
            </Text>
            <Text className="mt-2 text-2xl font-bold text-white">
              {ACCOUNT_CLASSES.length} classes
            </Text>
          </View>
        </View>

        <View className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <Text className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            Module 01 · Fondamentaux
          </Text>
          <Text className="mt-2 text-xl font-bold text-white">Passer une écriture comptable</Text>
          <Text className="mt-2 leading-5 text-slate-400">
            Trois situations guidées pour pratiquer le débit, le crédit et les comptes de tiers.
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            className="mt-4 items-center rounded-2xl bg-emerald-600 p-4"
            onPress={() => {
              if (lives === 0) {
                restoreLives();
                return;
              }

              setIsPlaying(true);
            }}
          >
            <Text className="font-extrabold text-white">
              {lives === 0 ? 'RECHARGER LES VIES' : 'COMMENCER LA LEÇON'}
            </Text>
          </TouchableOpacity>
        </View>

        <AccountCatalogSection />
      </ScrollView>
    </SafeAreaView>
  );
}
