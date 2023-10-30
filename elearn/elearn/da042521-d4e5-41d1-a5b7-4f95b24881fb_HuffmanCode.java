import java.util.PriorityQueue;

public class HuffmanCode {

    // Node class for Huffman tree
    private static class Node implements Comparable<Node> {
        char c;
        int freq;
        Node left, right;

        Node(char c, int freq, Node left, Node right) {
            this.c = c;
            this.freq = freq;
            this.left = left;
            this.right = right;
        }

        // Compare nodes based on their frequencies
        public int compareTo(Node other) {
            int compare = Integer.compare(freq, other.freq);
            if (compare != 0) {
                return compare;
            }

            // If the two nodes have the same frequency, use the following rules to select the right child
            if (getHeight(right) != getHeight(left)) {
                return Integer.compare(getHeight(right), getHeight(left));
            } else if (getNumberOfNodes(right) != getNumberOfNodes(left)) {
                return Integer.compare(getNumberOfNodes(right), getNumberOfNodes(left));
            } else {
                return Integer.compare(getSumOfAscii(right), getSumOfAscii(left));
            }
        }

        // Check if the node is a leaf node
        public boolean isLeaf() {
            return left == null && right == null;
        }

        // Get the height of the node
        public int getHeight() {
            return getHeight(this);
        }

        private int getHeight(Node node) {
            if (node == null) {
                return 0;
            } else {
                return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
            }
        }

        // Get the number of nodes in the subtree rooted at the node
        public int getNumberOfNodes() {
            return getNumberOfNodes(this);
        }

        private int getNumberOfNodes(Node node) {
            if (node == null) {
                return 0;
            } else {
                return getNumberOfNodes(node.left) + getNumberOfNodes(node.right) + 1;
            }
        }

        // Get the sum of the ASCII values of the alphabets in the subtree rooted at the node
        public int getSumOfAscii() {
            return getSumOfAscii(this);
        }

        private int getSumOfAscii(Node node) {
            if (node == null) {
                return 0;
            } else {
                return (int) node.c + getSumOfAscii(node.left) + getSumOfAscii(node.right);
            }
        }
    }

    private Node root;
    private String[] codes;

    public HuffmanCode(char[] a, int[] f) {
        if (a.length != f.length) {
            throw new IllegalArgumentException("The arrays a and f must have the same length.");
        }

        // Build a priority queue of nodes
        PriorityQueue<Node> pq = new PriorityQueue<>();
        for (int i = 0; i < a.length; i++) {
            pq.offer(new Node(a[i], f[i], null, null));
        }

        // Build the Huffman tree by repeatedly merging the two nodes with the smallest frequencies
        while (pq.size() > 1) {
            Node left = pq.poll();
            Node right = pq.poll();
            Node parent = new Node('\0', left.freq + right.freq, left, right);
            pq.offer(parent);
        }

        root = pq.poll();

        // Build the Huffman codes by traversing the tree
        codes = new String[128];
        buildCodes(root, "");
    }

    // Build the Huffman codes by traversing the tree
private void buildCodes(Node node, String code) {
    if (node.isLeaf()) {
        codes[node.c] = code;
        return;
    }

    buildCodes(node.left, code + "0");
    buildCodes(node.right, code + "1");
}
public String encode(String text) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < text.length(); i++) {
        char c = text.charAt(i);
        if (codes[c] == null) {
            throw new IllegalArgumentException("The character " + c + " cannot be encoded.");
        }
        sb.append(codes[c]);
    }
    return sb.toString();
}

public String decode(String codeString) {
    StringBuilder sb = new StringBuilder();
    Node node = root;
    int index = 0;
    while (index < codeString.length()) {
        if (node.isLeaf()) {
            sb.append(node.c);
            node = root;
            continue;
        }
        char currChar = codeString.charAt(index);
        if (currChar == '0') {
            if (node.left != null) {
                node = node.left;
            } else {
                node = node.right;
            }
        } else if (currChar == '1') {
            if (node.right != null) {
                node = node.right;
            } else {
                node = node.left;
            }
        } else {
            throw new IllegalArgumentException("The code string contains an invalid character: " + currChar);
        }
        index++;

        // Check if node is null, which means the code is invalid
        if (node == null) {
            throw new IllegalArgumentException("The code string is invalid.");
        }
    }
    // Add the last decoded character to the result
    sb.append(node.c);
    return sb.toString();
}

