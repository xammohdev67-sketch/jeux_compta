import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type {
  AccountSide,
  QuizQuestion,
  SYSCOHADAAccount,
} from '../../accounting/types/accounting';
import { useGameStore } from '../../../store/useGameStore';

interface ImputationQuizScreenProps {
  questions: readonly QuizQuestion[];
  onExit: () => void;
}

export function ImputationQuizScreen({ questions, onExit }: ImputationQuizScreenProps) {
  const { addXP, decreaseLives, incrementStreak, lives, maxLives, resetStreak } =
    useGameStore();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeSide, setActiveSide] = useState<AccountSide>('DEBIT');
  const [selectedDebit, setSelectedDebit] = useState<SYSCOHADAAccount | null>(null);
  const [selectedCredit, setSelectedCredit] = useState<SYSCOHADAAccount | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[questionIndex];

  if (!currentQuestion) {
    return (
      <View className="flex-1 justify-center bg-slate-950 p-6">
        <Text className="text-xl font-bold text-white">Aucun exercice n’est disponible.</Text>
        <TouchableOpacity
          accessibilityRole="button"
          className="mt-5 items-center rounded-2xl bg-emerald-600 p-4"
          onPress={onExit}
        >
          <Text className="font-bold text-white">Retour à l’accueil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const correctDebit = currentQuestion.correctAnswers.find((answer) => answer.side === 'DEBIT');
  const correctCredit = currentQuestion.correctAnswers.find(
    (answer) => answer.side === 'CREDIT',
  );
  const canValidate = selectedDebit !== null && selectedCredit !== null && isCorrect === null;

  const selectAccount = (account: SYSCOHADAAccount) => {
    if (isCorrect !== null) {
      return;
    }

    if (activeSide === 'DEBIT') {
      setSelectedDebit(account);
      setActiveSide('CREDIT');
    } else {
      setSelectedCredit(account);
    }
  };

  const validateAnswer = () => {
    if (!selectedDebit || !selectedCredit || isCorrect !== null) {
      return;
    }

    const answerIsCorrect =
      selectedDebit.accountNumber === correctDebit?.accountNumber &&
      selectedCredit.accountNumber === correctCredit?.accountNumber;

    setIsCorrect(answerIsCorrect);

    if (answerIsCorrect) {
      setCorrectCount((count) => count + 1);
      addXP(20);
      incrementStreak();
    } else {
      decreaseLives();
      resetStreak();
    }
  };

  const advance = () => {
    if (isCorrect === null) {
      return;
    }

    const hasNoLivesLeft = !isCorrect && lives <= 1;
    const isLastQuestion = questionIndex === questions.length - 1;

    if (hasNoLivesLeft || isLastQuestion) {
      setIsFinished(true);
      return;
    }

    setQuestionIndex((index) => index + 1);
    setSelectedDebit(null);
    setSelectedCredit(null);
    setActiveSide('DEBIT');
    setIsCorrect(null);
  };

  const retry = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedDebit(null);
    setSelectedCredit(null);
    setActiveSide('DEBIT');
    setIsCorrect(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <View className="flex-1 justify-center bg-slate-950 p-6">
        <View className="rounded-3xl border border-emerald-400/20 bg-slate-900 p-6">
          <Text className="text-sm font-bold uppercase tracking-widest text-emerald-300">
            Leçon terminée
          </Text>
          <Text className="mt-3 text-3xl font-extrabold text-white">
            {correctCount}/{questions.length} bonnes réponses
          </Text>
          <Text className="mt-3 leading-6 text-slate-300">
            {lives === 0
              ? 'Il ne vous reste plus de vies. Rechargez-les depuis l’accueil pour rejouer.'
              : 'Continuez à vous entraîner pour renforcer vos automatismes comptables.'}
          </Text>
        </View>
        {lives > 0 && (
          <TouchableOpacity
            accessibilityRole="button"
            className="mt-4 items-center rounded-2xl bg-emerald-600 p-4"
            onPress={retry}
          >
            <Text className="font-bold text-white">Rejouer la leçon</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          accessibilityRole="button"
          className="mt-3 items-center rounded-2xl border border-slate-700 p-4"
          onPress={onExit}
        >
          <Text className="font-bold text-slate-200">Retour à l’accueil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (lives === 0) {
    return (
      <View className="flex-1 justify-center bg-slate-950 p-6">
        <Text className="text-2xl font-extrabold text-white">Plus de vies disponibles</Text>
        <Text className="mt-3 leading-6 text-slate-400">
          Retournez à l’accueil pour recharger vos vies avant de reprendre l’entraînement.
        </Text>
        <TouchableOpacity
          accessibilityRole="button"
          className="mt-5 items-center rounded-2xl bg-emerald-600 p-4"
          onPress={onExit}
        >
          <Text className="font-bold text-white">Retour à l’accueil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const selectedAccount = activeSide === 'DEBIT' ? selectedDebit : selectedCredit;

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity accessibilityRole="button" onPress={onExit}>
            <Text className="font-semibold text-slate-300">‹ Accueil</Text>
          </TouchableOpacity>
          <Text className="text-sm font-bold text-red-300">
            Vies {lives}/{maxLives}
          </Text>
        </View>

        <View className="mt-7 flex-row items-center justify-between">
          <Text className="text-sm font-bold uppercase tracking-widest text-emerald-300">
            Imputation · Débutant
          </Text>
          <Text className="text-sm font-semibold text-slate-400">
            {questionIndex + 1}/{questions.length}
          </Text>
        </View>
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
          <View
            className="h-full rounded-full bg-emerald-400"
            style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
          />
        </View>

        <View className="mt-5 rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <Text className="text-lg font-bold leading-7 text-white">
            {currentQuestion.questionText}
          </Text>
          <Text className="mt-4 text-2xl font-extrabold text-amber-300">
            {currentQuestion.amountFCFA?.toLocaleString('fr-FR')} FCFA
          </Text>
        </View>

        <View className="mt-5 flex-row gap-3">
          {(['DEBIT', 'CREDIT'] as const).map((side) => {
            const isDebit = side === 'DEBIT';
            const account = isDebit ? selectedDebit : selectedCredit;
            const isActive = activeSide === side && isCorrect === null;

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                className={`flex-1 rounded-2xl border-2 p-4 ${
                  isActive ? 'border-emerald-400 bg-slate-900' : 'border-slate-800 bg-slate-900'
                }`}
                disabled={isCorrect !== null}
                key={side}
                onPress={() => setActiveSide(side)}
              >
                <Text
                  className={`text-center font-bold ${
                    isDebit ? 'text-emerald-300' : 'text-sky-300'
                  }`}
                >
                  {isDebit ? 'DÉBIT' : 'CRÉDIT'}
                </Text>
                <Text className="mt-2 text-center text-sm text-slate-200">
                  {account ? `${account.accountNumber} · ${account.label}` : 'Choisir un compte'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="mb-2 mt-6 text-sm font-semibold text-slate-300">
          Comptes proposés · {activeSide === 'DEBIT' ? 'sélectionnez le débit' : 'sélectionnez le crédit'}
        </Text>
        <View className="gap-2">
          {currentQuestion.availableOptions.map((account) => {
            const isSelected = selectedAccount?.accountNumber === account.accountNumber;
            const isAnswer =
              (isCorrect !== null && correctDebit?.accountNumber === account.accountNumber) ||
              (isCorrect !== null && correctCredit?.accountNumber === account.accountNumber);

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                className={`rounded-2xl border p-4 ${
                  isAnswer
                    ? 'border-emerald-400 bg-emerald-500/10'
                    : isSelected
                      ? 'border-sky-400 bg-sky-500/10'
                      : 'border-slate-800 bg-slate-900'
                }`}
                disabled={isCorrect !== null}
                key={account.accountNumber}
                onPress={() => selectAccount(account)}
              >
                <Text className="font-bold text-white">
                  {account.accountNumber}
                  <Text className="font-normal text-slate-300"> · {account.label}</Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isCorrect !== null && (
          <View
            accessibilityRole="alert"
            className={`mt-4 rounded-2xl border p-4 ${
              isCorrect
                ? 'border-emerald-400/40 bg-emerald-500/10'
                : 'border-amber-400/40 bg-amber-500/10'
            }`}
          >
            <Text className="font-bold text-white">
              {isCorrect ? 'Bonne réponse ! +20 XP' : 'Pas tout à fait'}
            </Text>
            <Text className="mt-2 leading-5 text-slate-200">{currentQuestion.explanation}</Text>
          </View>
        )}

        <TouchableOpacity
          accessibilityRole="button"
          className={`mt-5 items-center rounded-2xl p-4 ${
            canValidate || isCorrect !== null ? 'bg-emerald-600' : 'bg-slate-800'
          }`}
          disabled={!canValidate && isCorrect === null}
          onPress={isCorrect === null ? validateAnswer : advance}
        >
          <Text className="text-base font-extrabold text-white">
            {isCorrect === null
              ? 'VALIDER LA RÉPONSE'
              : lives === 0 || questionIndex === questions.length - 1
                ? 'VOIR LE RÉSULTAT'
                : 'QUESTION SUIVANTE'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
