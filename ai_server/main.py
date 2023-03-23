# use natural language toolkit
import time
import numpy as np
import nltk
from nltk.stem.lancaster import LancasterStemmer
import os
import json
import datetime
import string
import tensorflow_hub
from keybert import KeyBERT
class Model:
    def __init__(self):
        self.words = []
        self.classes = []
        self.documents = []
        
    def getRecommendations(self, gvn_keyword="", data=[]):
        def processDesc(desc):
            keywords = kw_model.extract_keywords(desc, stop_words='english')
            return [keyword[0] for keyword in keywords]
        
        def sigmoid(x):
            output = 1/(1+np.exp(-x))
            return output


        def sigmoid_output_to_derivative(output):
            return output*(1-output)


        def clean_up_sentence(sentence):
            sentence_words = nltk.word_tokenize(sentence)
            sentence_words = [word.lower() for word in sentence_words]
            return sentence_words



        def bow(sentence, words, show_details=False):
            sentence_words = clean_up_sentence(sentence)
            bag = [0]*len(words)
            for s in sentence_words:
                for i, w in enumerate(words):
                    if w == s:
                        bag[i] = 1
                        if show_details:
                            print("found in bag: %s" % w)

            return (np.array(bag))


        def think(sentence, show_details=False):
            x = bow(sentence.lower(), self.words, show_details)
            if show_details:
                print("sentence:", sentence, "\n bow:", x)
            l0 = x
            l1 = sigmoid(np.dot(l0, synapse_0))
            l2 = sigmoid(np.dot(l1, synapse_1))
            return l2


        def train(X, y, hidden_neurons=10, alpha=1, epochs=50000, dropout=False, dropout_percent=0.5):

            print("Training with %s neurons, alpha:%s, dropout:%s %s" % (
                hidden_neurons, str(alpha), dropout, dropout_percent if dropout else ''))
            print("Input matrix: %sx%s    Output matrix: %sx%s" %
                (len(X), len(X[0]), 1, len(self.classes)))
            np.random.seed(1)

            last_mean_error = 1
            synapse_0 = 2*np.random.random((len(X[0]), hidden_neurons)) - 1
            synapse_1 = 2*np.random.random((hidden_neurons, len(self.classes))) - 1

            prev_synapse_0_weight_update = np.zeros_like(synapse_0)
            prev_synapse_1_weight_update = np.zeros_like(synapse_1)

            synapse_0_direction_count = np.zeros_like(synapse_0)
            synapse_1_direction_count = np.zeros_like(synapse_1)

            for j in iter(range(epochs+1)):

                layer_0 = X
                layer_1 = sigmoid(np.dot(layer_0, synapse_0))

                if (dropout):
                    layer_1 *= np.random.binomial([np.ones((len(X), hidden_neurons))],
                                                1-dropout_percent)[0] * (1.0/(1-dropout_percent))

                layer_2 = sigmoid(np.dot(layer_1, synapse_1))

                layer_2_error = y - layer_2

                if (j % 10000) == 0 and j > 5000:
                    if np.mean(np.abs(layer_2_error)) < last_mean_error:
                        print("delta after "+str(j)+" iterations:" +
                            str(np.mean(np.abs(layer_2_error))))
                        last_mean_error = np.mean(np.abs(layer_2_error))
                    else:
                        print("break:", np.mean(np.abs(layer_2_error)),
                            ">", last_mean_error)
                        break

                layer_2_delta = layer_2_error * sigmoid_output_to_derivative(layer_2)

                layer_1_error = layer_2_delta.dot(synapse_1.T)

                layer_1_delta = layer_1_error * sigmoid_output_to_derivative(layer_1)

                synapse_1_weight_update = (layer_1.T.dot(layer_2_delta))
                synapse_0_weight_update = (layer_0.T.dot(layer_1_delta))

                if (j > 0):
                    synapse_0_direction_count += np.abs(
                        ((synapse_0_weight_update > 0)+0) - ((prev_synapse_0_weight_update > 0) + 0))
                    synapse_1_direction_count += np.abs(
                        ((synapse_1_weight_update > 0)+0) - ((prev_synapse_1_weight_update > 0) + 0))

                synapse_1 += alpha * synapse_1_weight_update
                synapse_0 += alpha * synapse_0_weight_update

                prev_synapse_0_weight_update = synapse_0_weight_update
                prev_synapse_1_weight_update = synapse_1_weight_update

            now = datetime.datetime.now()

            synapse = {'synapse0': synapse_0.tolist(), 'synapse1': synapse_1.tolist(),
                    'datetime': now.strftime("%Y-%m-%d %H:%M"),
                    'words': self.words,
                    'classes': self.classes
                    }
            synapse_file = "synapses.json"

            with open(synapse_file, 'w') as outfile:
                json.dump(synapse, outfile, indent=4, sort_keys=True)
            print("saved synapses to:", synapse_file)
        training_data = []



        if not os.path.exists("synapses.json") and gvn_keyword:
            training_data.append({"vid": "https://www.youtube.com/watch?v=pCbFNf0NNhQ", "desc": "Random Variable/Probability Distribution/Mean and Variance Class 12th - Probability CBSE/ISC 2021 Probability Class 12th- Random Variable/Probability Distribution/Mean/Variance/ CBSE/ISC Board Exam."})
            training_data.append({"vid": "https://www.youtube.com/watch?v=BFb0lTNP99Q", "desc": 'PROBABILITY BINOMIAL DISTRIBUTION CBSE/ISC 2021 CLASS XII 12th ( not for CBSE) PROBABILITY- BINOMIAL DISTRIBUTION CBSE 2021 CLASS XII 12th MATH. NCERT Exercise 13.5 #ProbabilityCBSE #CBSEMath2021 #BinomialDistribution © Copyright 2021, Neha Agrawal. All rights reserved.'})
            training_data.append({"vid": "https://www.youtube.com/watch?v=hfBeF8jdO6U", "desc": '''Normal Distribution | Probability | Mathematics | MMS | BCom | Engineering Heyy Guyzz!!! This is Amol Balekar. Here's the video on Normal Distribution which covers Important Numericals of Normal Distribution which is a part of Probability. So, please go through this Video to ASSURE your easy earning Marks of Normal distribution. And if you are having any doubts, then please COMMENT down in the COMMENT SECTION. I will surely try to solve your doubts #LearnOpediA#NormalDistribution#Probability'''})
            training_data.append(
                {"vid": "https://www.youtube.com/watch?v=VIH1DL77TN4", "desc": '''Poisson Distribution | Probability | 03 Marks | HSC (12th) Commerce
            Heyy Guyzz!!! This is Amol Balekar. Here's the video on POISSON DISTRIBUTION which is a Subpart of PROBABILITY. This Video covers Numericals of every possible type of POISSON DISTRIBUTION which generally comes in  HSC Exam for 03 Marks for COMMERCE.

            So, please go through this Video to ASSURE your 03 Marks.

            And if you are having any doubts, then please COMMENT down in the COMMENT SECTION. I will surely try to solve your doubt in my Next Video.


            Introduction - 0:04
            Formula - 0:25
            Numericals - 1:12


            #LearnOpediA#PoissonDistribution #Probability
            '''})

            training_data.append({"vid": "https://www.youtube.com/watch?v=eQhOAHMankc", "desc": '''KINEMATICS 01 || Motion in a Straight Line || 1-D Motion || NEET Physics Crash Course
            UMEED-NEET 2021

            To download lecture notes,practice sheet & practice sheet video solution visit Umeed Batch in Batch Section of PW App(http://bit.ly/3ru9Agh).
            Note: This batch is completely FREE ,you just have to click on "BUY Now" button for your enrollment.
            '''})
        if not gvn_keyword and not data:
            return []
        if not gvn_keyword:
            for datum in data:
                training_data.append({"vid":datum["link"], "desc":datum["description"]})


        embedding_model = tensorflow_hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")
        kw_model = KeyBERT(model=embedding_model)

        for pattern in training_data:
            w = processDesc(pattern['desc'])
            
            self.words.extend(w)
            self.documents.append((w, pattern['vid']))
            if pattern['vid'] not in self.classes:
                self.classes.append(pattern['vid'])
        print(self.words)
        print(self.classes)

        self.words = [w.lower() for w in self.words]
        self.words = list(set(self.words))

        self.classes = list(set(self.classes))


        training = []
        output = []
        output_empty = [0] * len(self.classes)

        for doc in self.documents:
            bag = []
            pattern_words = doc[0]
            pattern_words = [word.lower() for word in pattern_words]
            for w in self.words:
                bag.append(1) if w in pattern_words else bag.append(0)

            training.append(bag)
            output_row = list(output_empty)
            output_row[self.classes.index(doc[1])] = 1
            output.append(output_row)

        i = 0
        w = self.documents[i][0]
        print ([word.lower() for word in w])
        print(training[i])
        print(output[i])

        X = np.array(training)
        y = np.array(output)

        start_time = time.time()

        train(X, y, hidden_neurons=20, alpha=0.1, epochs=100000, dropout=False, dropout_percent=0.2)

        elapsed_time = time.time() - start_time
        print("processing time:", elapsed_time, "seconds")


        ERROR_THRESHOLD = 0.2
        synapse_file = 'synapses.json'
        with open(synapse_file) as data_file:
            synapse = json.load(data_file)
            synapse_0 = np.asarray(synapse['synapse0'])
            synapse_1 = np.asarray(synapse['synapse1'])


        def classify(sentence, show_details=False):
            results = think(sentence, show_details)
            print(results)
            results = [[i, r] for i, r in enumerate(results) if r > ERROR_THRESHOLD]
            results.sort(key=lambda x: x[1], reverse=True)
            return_results = [[self.classes[r[0]], r[1]] for r in results]
            print("%s \n classification: %s" % (sentence, return_results))
            return return_results

        if gvn_keyword:
            return [result[0] for result in classify(gvn_keyword)]
